export default function Contatti() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
            {/* Titolo pagina */}
            <h2 className="text-3xl font-bold text-center text-gray-700">
                Contatti & Presentazione
            </h2>

            {/* Sezione Descrizione Progetto */}
            <div className="bg-white p-8 rounded-xl shadow-md space-y-4">
                <h3 className="text-2xl font-semibold text-blue-600 mb-2">
                    Chi siamo
                </h3>
                <p className="text-gray-700">
                    Park4Everyone è un progetto dedicato a facilitare la ricerca di parcheggi accessibili e sicuri per tutti.
                    La nostra missione è semplificare la vita agli automobilisti e promuovere una mobilità più inclusiva.
                </p>
                <p className="text-gray-700">
                    Se sei un’azienda interessata a collaborare o integrare i nostri servizi, sei nel posto giusto!
                </p>
            </div>

            {/* Sezione Contatti Azienda */}
            <div className="bg-white p-8 rounded-xl shadow-md space-y-4">
                <h3 className="text-2xl font-semibold text-blue-600 mb-2">
                    Contatti Azienda
                </h3>
                <p><strong>Nome Azienda:</strong> Park4Everyone S.r.l.</p>
                <p><strong>Indirizzo:</strong> Via Esempio 123, 16100 Genova, Italia</p>
                <p><strong>Email:</strong> <a href="mailto:info@park4everyone.it" className="text-blue-600 underline">info@park4everyone.it</a></p>
                <p><strong>Telefono:</strong> +39 010 1234567</p>
            </div>

            {/* Sezione Contatti Personali (opzionale) */}
            <div className="bg-white p-8 rounded-xl shadow-md space-y-4">
                <h3 className="text-2xl font-semibold text-blue-600 mb-2">
                    Contatti Diretti
                </h3>
                <p><strong>Referente:</strong> Mario Rossi</p>
                <p><strong>Email:</strong> <a href="mailto:mario.rossi@email.com" className="text-blue-600 underline">mario.rossi@email.com</a></p>
                <p><strong>Telefono:</strong> +39 333 1234567</p>
            </div>
        </div>
    );
}
