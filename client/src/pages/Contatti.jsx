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
                    Park4Everyone è un progetto dedicato a facilitare la ricerca di posti auto per disabili nel territorio genovese.
                    La nostra missione è semplificare la vita agli automobilisti e promuovere una mobilità più inclusiva.
                </p>
                <p className="text-gray-700">
                    Se sei un’azienda interessata a collaborare o integrare i nostri servizi, sei nel posto giusto!
                </p>
            </div>

            {/* Sezione Contatti Azienda */}
            <div className="bg-white p-8 rounded-xl shadow-md space-y-4">
                <h3 className="text-2xl font-semibold text-blue-600 mb-2">
                    Contatti 
                </h3>
                <p><strong>Nome Progetto:</strong> Park4Everyone </p>
                <p><strong>Email:</strong> <a href="mailto:park4everyone@gmail.com" className="text-blue-600 underline">park4everyone@gmail.com</a></p>
            </div>

            {/* Sezione Contatti Personali (opzionale) */}
            <div className="bg-white p-8 rounded-xl shadow-md space-y-4">
                <h3 className="text-2xl font-semibold text-blue-600 mb-2">
                    Contatti Diretti
                </h3>
                <p><strong>Referente:</strong> Matteo Guglielmo Amore</p>
                <p><strong>Telefono:</strong> +39 3491345670</p>
            </div>
        </div>
    );
}
