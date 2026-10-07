import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";

const Header = () => {
  const { orderItems } = useCart();
  const itemCount = orderItems.reduce(
    (total, orderItem) => total + orderItem.quantity,
    0,
  );

  return (
    <header className="fixed z-100 top-0 w-full h-20 flex items-center justify-between ">
      <div
        className={"w-full h-full bg-black opacity-70 absolute top-0 "}
      ></div>
      <Link to="/">
        <img
          src="/Logo/Logoicon.png"
          alt="The Card Club logo"
          className="h-17 w-auto relative ml-2"
        />
      </Link>

      <Link to="/cart">
        <div className="relative mr-4">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>

          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white font-semibold">
              {itemCount}
            </span>
          )}
        </div>
      </Link>
    </header>
  );
};

export default Header;
