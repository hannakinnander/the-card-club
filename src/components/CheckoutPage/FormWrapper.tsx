import type { ReactNode } from "react";

interface IProps {
  isLocked: boolean;
  isCompleted: boolean;
  isEditing: boolean;
  onClick: () => void;
  children: ReactNode;
  heading: string;
  summary?: ReactNode;
}

const FormWrapper = ({
  isLocked,
  isCompleted,
  isEditing,
  onClick,
  children,
  heading,
  summary,
}: IProps) => {
  const renderContent = () => {
    if (isEditing) {
      return children;
    } else if (isCompleted) {
      return (
        <div>
          {summary}
          <button onClick={onClick}>Redigera ✎</button>
        </div>
      );
    } else {
      return children;
    }
  };
  return (
    <div className={`${isLocked ? "opacity-50 pointer-events-none" : ""}`}>
      <p>{heading}</p>
      {renderContent()}
    </div>
  );
};

export default FormWrapper;
