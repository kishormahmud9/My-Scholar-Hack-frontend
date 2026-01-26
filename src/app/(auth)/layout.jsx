import { Toaster } from "react-hot-toast";
import ClientProvider from "@/components/ClientProvider/ClientProvider";

export default function AuthLayout({ children }) {
    return (
        <>
            <ClientProvider>
                {children}
                <Toaster />
            </ClientProvider>
        </>
    );
}
