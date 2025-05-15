export function Footer() {
    return (
        <footer className="bg-rose-600 mt-6 w-full">
            <div className="w-full flex justify-center py-8">
                <h2 className="text-gray-200 text-center">
                    Todos os direitos reservados - copyright {new Date().getFullYear()}
                </h2>
            </div>
        </footer>
    );
}
