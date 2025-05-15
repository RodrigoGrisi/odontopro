export function Footer() {
    return (
        <footer className="bg-emerald-600 text-close-300 mt-6 w-full">
            <div className="w-full flex justify-center py-5">
                <h2 className="text-gray-200 text-center">
                    Todos os direitos reservados - copyright {new Date().getFullYear()}
                </h2>
            </div>
        </footer>
    );
}
