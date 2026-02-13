export default function Logo() {
  return (
    <div className="flex justify-center items-center">
    <svg
      class="size-8 text-white bg-primary p-1 rounded-md ml-2"
      fill="text-white"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M42 20L28 6C29 7 28 10 26 13C24 16 22 18 20 20C18 22 16 24 13 26C10 28 7 29 6 28L20 42C21 43 24 42 28 40C30 39 32 37 35 35C37 32 39 30 40 28C42 24 43 21 42 20Z"
        fill="currentColor"
      ></path>
    </svg>
    <p className="text-xl font-bold mt-1">وصلة</p>
    </div>
  );
}
