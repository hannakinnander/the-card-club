import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  children: ReactNode;
}
const GoBackBtn = ({ children }: IProps) => {
  const savedFilters = sessionStorage.getItem("productFilters");
  const navigate = useNavigate();

  const onGoBackClick = () => {
    navigate(`${savedFilters ? `/?${savedFilters}` : "/"}`);
  };

  return (
    <button className="bg-gray-300 text-black w-fit" onClick={onGoBackClick}>
      ← {children}
    </button>
  );
};

export default GoBackBtn;
