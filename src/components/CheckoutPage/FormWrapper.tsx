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
        <div className={"text-black"}>
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
      className={`text-black  relative rounded-lg p-2 border shadow-lg ${!isLocked && !isEditing ? "bg-amber-300" : ""} ${isLocked ? "opacity-40 bg-gray-100 pointer-events-none shadow-none border-none" : ""} ${isCompleted && !isEditing ? "bg-green-100 opacity-90 shadow-none border-none" : " "} ${isEditing ? "bg-gray-200" : ""} `}
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
