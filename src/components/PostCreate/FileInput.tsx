import { Input } from '@/components/ui/input';
import { FileInputDTO } from '@/type/PostCreate/PostCreate';

const FileInput = ({ fileLabel, onFileChange, openFileSelector }: FileInputDTO) => {
  return (
    <div className="mb-4 flex flex-row items-center">
      <label className="w-20 text-right mr-12 font-extrabold" htmlFor="fileAttachment">
        파일 첨부
      </label>
      <Input id="fileAttachment" type="file" onChange={onFileChange} className="hidden" />
      <Input
        type="text"
        onClick={openFileSelector}
        value={fileLabel || '파일 선택'}
        readOnly
        className="flex-grow p-2 border-[1px] border-black rounded cursor-pointer"
        placeholder="파일 선택"
      />
    </div>
  );
};

export default FileInput;
