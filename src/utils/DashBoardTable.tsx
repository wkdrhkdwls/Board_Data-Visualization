import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { DashBoardTableDTO } from '@/type/PostTable/DashBoard';

export function DashBoardTable({
  posts,
  totalPages,
  currentPage,
  handlePrevious,
  handleNext,
  setCurrentPage,
}: DashBoardTableDTO) {
  return (
    <>
      <Table className="border-b-[1px] font-bold border-[#e1e1e1] text-center">
        <TableHeader className="border-t-[2px] border-black">
          <TableRow className="w-full ">
            <TableHead className="w-[6%] mobile:w-1/12 tablet:w-1/12 text-center">NO</TableHead>
            <TableHead className="w-[52%] mobile:w-10/12 tablet:w-8/12 text-center">제목</TableHead>
            <TableHead className="w-[14%] mobile:w-1/12 tablet:w-1/12 text-center">
              글쓴이
            </TableHead>
            <TableHead className="w-[14%] text-center tablet:w-1/12 mobile:hidden">
              작성시간
            </TableHead>
            <TableHead className="w-[14%] text-center tablet:w-1/12 mobile:hidden">
              조회수
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.id}</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.author}</TableCell>
              <TableCell className="text-right mobile:hidden">
                {new Date(post.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right mobile:hidden">{post.views}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevious} />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => setCurrentPage(index + 1)}
                isActive={currentPage === index + 1}
                className={currentPage === index + 1 ? 'text-[#EE3918]' : undefined}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={handleNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
