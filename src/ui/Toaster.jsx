import { useToast } from "../use-hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./Toast";

function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} data-testid="toast">
            <div style={{ display: "grid", gap: "0.25rem", backgroundColor: "#fafaf8" }}>
              {title && (
                <ToastTitle style={{ color: "#2c2c2c" }} data-testid="toast-title">{title}</ToastTitle>
              )}
              {description && (
                <ToastDescription style={{ color: "#2c2c2c" }} data-testid="toast-description">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

export default Toaster;
