import { Button, type ButtonProps } from "./button";
import { LoadingSpinner } from "./loading-spinner";

type LoadingButtonProps = {
  loading: boolean;
  children: React.ReactNode;
} & ButtonProps;

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  children,
  ...props
}) => {
  return <Button {...props}>{loading ? <LoadingSpinner /> : children}</Button>;
};

export { LoadingButton };
