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
import { PostDTO } from '@/type/PostTable/DashBoard';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

// Supabase 연결
const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseURL, supabaseKey);
//10개씩 페이징한다.
const pageSize = 10;

export function DashBoardTable() {
  const [posts, setPosts] = useState<PostDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    async function getPosts() {
      const { count } = await supabase.from('post').select('*', { count: 'exact' });
      const { data, error } = await supabase
        .from('post')
        .select('*')
        .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);
      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data || []);
        if (count) setTotalPosts(count);
      }
    }
    getPosts();
  }, [currentPage]);

  const totalPages = Math.ceil(totalPosts / pageSize);

  const handlePrevious = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages);
  };

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
