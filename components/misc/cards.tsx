import Image from "next/image";
import { NotificationBadgeProps, NotificationCardProps, ErrorMessageCardProps, SuccessfulMessageCardProps } from "./cards.interface";
export function NotificationCard({ notification }: NotificationCardProps) {
  return (
    <div className="mt-0 w-96 h-20 bg-white hover:bg-indigo-100 border dark:border-none dark:bg-gray-700 dark:hover:bg-gray-500 m-4 ml-auto mr-auto pl-4 pr-8 rounded-lg shadow flex flex-row items-center justify-between hover:cursor-pointer">
      <div className="w-4 mr-4">
        <Image width={"48"} height={"48"} alt="Notification Icon" src="https://img.icons8.com/color/48/000000/appointment-reminders--v1.png" />
      </div>
      <div className="w-96">
        <div className="text-blue-700 dark:text-blue-300">
          {notification && notification.title}
        </div>
        <div className="text-sm">{notification && notification.body}</div>
      </div>
    </div>
  );
}

export function ErrorMessageCard({
  children,
  className,
  fixed=false
}: ErrorMessageCardProps) {
  return (
    <div
      className={
        `animate-shake flex flex-row items-center justify-center bg-red-300/80 dark:bg-red-900/40 backdrop-blur-lg shadow-md text-red-500 px-4 py-2 rounded ${fixed?"fixed":"relative"} ${className?className:""}`
      }
      role="alert"
    >
      <div className="mr-2 flex items-center justify-center">
        <Image
          width={"20"}
          height={"20"}
          alt="Error Icon"
          src="https://cdn-icons-png.flaticon.com/512/753/753345.png"
        />
      </div>
      {children}
    </div>
  );
}


export function SuccessfulMessageCard({
  children,
  className,
}: SuccessfulMessageCardProps) {
  return (
    <div
      className={
        className +
        " animate-single-pulse flex flex-row items-center justify-center bg-green-500/50 text-black dark:bg-green-900/40 backdrop-blur-lg shadow-md dark:text-green-500 px-4 py-2 rounded relative"
      }
      role="alert"
    >
      <div className="mr-2 flex items-center justify-center">
        <Image
          width={"20"}
          height={"20"}
          alt="Successful Icon"
          src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
        />
      </div>
      {children}
    </div>
  );
}

export function NotificationBadge({ message }: NotificationBadgeProps) {
  return (
    <div
      className="transform fixed bottom-10 right-1/2 translate-x-1/2 overflow-visible"
      role="alert"
    >
      <div className="flex flex-row items-center justify-center px-2  p-2 rounded-2xl shadow bg-indigo-700 animate-single-pulse">
        <div className="mr-4">
          {!message.error && (
            <Image
              width={"20"}
              height={"20"}
              alt="Successful Icon"
              src="https://img.icons8.com/emoji/20/000000/check-mark-emoji.png"
            />
          )}
          {message.error && (

            <Image
            width={"20"}
            height={"20"}
            alt="Error Icon"
            src="https://img.icons8.com/emoji/20/000000/cross-mark-emoji.png"
          />
          )}
        </div>
        <div>{message.message}</div>
      </div>
    </div>
  );
}