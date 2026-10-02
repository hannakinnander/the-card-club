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
        <div className={""}>
          {summary}
          <button
            className={"absolute top-2 right-2 text-xl"}
            onClick={onClick}
          >
            ✎
          </button>
        </div>
      );
    } else {
      return children;
    }
  };
  return (
    <div
      className={`bg-amber-100 w-150 relative rounded-2xl p-2 ${isLocked ? "opacity-50 bg-gray-200 pointer-events-none" : ""}`}
    >
      <p className={"text-2xl"}>{heading}</p>
      {renderContent()}
    </div>
  );
};

export default FormWrapper;
