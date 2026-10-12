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
        <div className="text-white text-sm">
          {summary}
          <button className="absolute top-2 right-2 text-xl" onClick={onClick}>
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
      className={`text-white relative rounded-lg p-2 border border-red-900 bg-gray-800 ${isLocked && "opacity-40 pointer-events-none shadow-none border-none"} ${isCompleted && !isEditing && "opacity-90 shadow-none border-none"}`}
    >
      <p className="text-2xl mb-2">
        {heading}
        <span className="text-green-500">
          {isCompleted && !isEditing ? " ✔︎" : ""}
        </span>
      </p>
      {renderContent()}
    </div>
  );
};

export default FormWrapper;
