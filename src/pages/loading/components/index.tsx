import MoonLoader from 'react-spinners/MoonLoader';

const MyComponent = () => {
  return (
    <div className="my-component">
      <MoonLoader size={150} color={'#123abc'} loading={true} />
    </div>
  );
};

export default MyComponent;
