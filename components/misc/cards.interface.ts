export type Notification = {
    title: string;
    body: string;
  };
  export type NotificationCardProps = {
    notification: Notification;
  };
  export type ErrorMessageCardProps = {
    children?: React.ReactNode;
    className?: string;
    fixed?: boolean;
  };
  
  export type SuccessfulMessageCardProps = {
    children?: React.ReactNode;
    className?: string;
  };
  export type NotificationBadgeMessage = {
    error?: boolean;
    message: string;
  };
  export type NotificationBadgeProps = {
    message: NotificationBadgeMessage;
  };