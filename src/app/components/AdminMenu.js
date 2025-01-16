import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function AdminMenu({
  mainButtonColor = "#b32d2d",
  subjectUrl,
  contentId,
}) {
  const { data: session } = useSession();

  const isAdmin = session?.user?.permissions?.includes("admin");

  if (!isAdmin) {
    return null;
  }
  return (
    <div className="fixed end-6 bottom-6 group">
      <div
        id="speed-dial-menu-default"
        className="flex flex-col items-center mb-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        {contentId && (
          <Link
            href={`/admin/content/edit/${contentId}`}
            className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m13.835 7.578-.005.007-7.137 7.137 2.139 2.138 7.143-7.142-2.14-2.14Zm-10.696 3.59 2.139 2.14 7.138-7.137.007-.005-2.141-2.141-7.143 7.143Zm1.433 4.261L2 12.852.051 18.684a1 1 0 0 0 1.265 1.264L7.147 18l-2.575-2.571Zm14.249-14.25a4.03 4.03 0 0 0-5.693 0L11.7 2.611 17.389 8.3l1.432-1.432a4.029 4.029 0 0 0 0-5.689Z" />
            </svg>
            <span className="sr-only">Edita l'exercici</span>
          </Link>
        )}

        {subjectUrl && (
          <Link
            href={`/admin/subject/edit/${subjectUrl}`}
            className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
              ></path>
            </svg>
            <span className="sr-only">Edita l'assignatura</span>
          </Link>
        )}
      </div>

      {/* Main Button */}
      <Link
        href={subjectUrl ? `/admin/exercise/create/${subjectUrl}` : "/admin/subject/create"}
        aria-controls="speed-dial-menu-default"
        aria-expanded="false"
        style={{ backgroundColor: mainButtonColor }}
        className="flex items-center justify-center text-white rounded-full w-14 h-14 hover:opacity-90 dark:focus:ring-blue-800 focus:ring-4 focus:outline-none"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
        <span className="sr-only">Afegeix una assignatura</span>
      </Link>
    </div>
  );
}
