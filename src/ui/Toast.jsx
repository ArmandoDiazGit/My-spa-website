import * as ToastPrimitives from "@radix-ui/react-toast";
import { X } from "lucide-react";
import styles from "./Toast.module.css";

const ToastProvider = ToastPrimitives.Provider;

function ToastViewport({ className, ...props }, ref) {
  return (
    <ToastPrimitives.Viewport
      ref={ref}
      className={`${styles.viewport} ${className || ""}`}
      {...props}
    />
  );
}

function Toast({ className, variant = "default", ...props }, ref) {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={`${styles.root} ${styles[variant] || ""} ${className || ""}`}
      {...props}
    />
  );
}

function ToastAction({ className, ...props }, ref) {
  return (
    <ToastPrimitives.Action
      ref={ref}
      className={`${styles.action} ${className || ""}`}
      {...props}
    />
  );
}

function ToastClose({ className, ...props }, ref) {
  return (
    <ToastPrimitives.Close
      ref={ref}
      className={`${styles.close} ${className || ""}`}
      toast-close=""
      {...props}
    >
      <X className={styles.closeIcon} />
    </ToastPrimitives.Close>
  );
}

function ToastTitle({ className, ...props }, ref) {
  return (
    <ToastPrimitives.Title
      ref={ref}
      className={`${styles.title} ${className || ""}`}
      {...props}
    />
  );
}

function ToastDescription({ className, ...props }, ref) {
  return (
    <ToastPrimitives.Description
      ref={ref}
      className={`${styles.description} ${className || ""}`}
      {...props}
    />
  );
}

ToastViewport.displayName = "ToastViewport";
Toast.displayName = "Toast";
ToastAction.displayName = "ToastAction";
ToastClose.displayName = "ToastClose";
ToastTitle.displayName = "ToastTitle";
ToastDescription.displayName = "ToastDescription";

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
