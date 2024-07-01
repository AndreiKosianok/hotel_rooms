interface IButtonProps {
  className: string;
  disabled?: boolean;
  onClick: () => void;
  text: string | number;
}
export default function Button({
  className,
  disabled,
  onClick,
  text,
  ...rest
}: IButtonProps) {
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {text}
    </button>
  );
}
