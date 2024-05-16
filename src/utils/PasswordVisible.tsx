import { TogglePasswordVisibilityDTO } from '@/type/Utils/passwordVisible';
import { EyeFilled, EyeInvisibleOutlined } from '@ant-design/icons';

const TogglePasswordVisibleButton = ({ isVisible, onToggle }: TogglePasswordVisibilityDTO) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
    >
      {isVisible ? <EyeInvisibleOutlined /> : <EyeFilled />}
    </button>
  );
};

export default TogglePasswordVisibleButton;
