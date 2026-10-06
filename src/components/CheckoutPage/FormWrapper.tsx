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
      className={` relative rounded-2xl p-2 border shadow-lg  ${isLocked ? "opacity-50 bg-gray-200 pointer-events-none shadow-none border-none" : ""} ${isCompleted && !isEditing ? "bg-green-50 shadow-none border-none" : ""} `}
    >
      <p className={"text-2xl"}>
        {heading}
        <span className={"text-green-500"}>
          {isCompleted && !isEditing ? " ✔︎" : ""}
        </span>
      </p>
      {renderContent()}
    </div>
  );
};

export default FormWrapper;
