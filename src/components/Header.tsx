import useCart from "../hooks/useCart";

const Header = () => {
  const { orderItems } = useCart();
  const itemCount = orderItems.reduce(
    (total, orderItem) => total + orderItem.quantity,
    0,
  );

  return (
    <header className="flex items-center justify-between bg-black px-4 py-3 text-white">
      <img src="public\Logo\Logoicon.png" alt="The Card Club logo" className="h-14 w-auto" />

      <div className="relative">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
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
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold">
            {itemCount}
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
