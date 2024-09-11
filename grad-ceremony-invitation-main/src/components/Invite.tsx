import React, {useState} from 'react';

interface CorrectSurnames {
    [key: string]: {
        message: string
    };
}

const correctSurnames: CorrectSurnames = {

    fulanoBeltrano: {
        message: 'Fulano,\n' +
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },

};
const normalizeText = (text: string): string => {
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '')
        .toLowerCase();
};

const Invite: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [isInvited, setIsInvited] = useState<boolean>(false);
    const [formVisible, setFormVisible] = useState<boolean>(true);

    const checkInvite = () => {
        if (name.length === 0 || surname.length === 0) {
            setMessage('Por favor, digite seu primeiro nome e último nome.');
            setIsInvited(false);
            return;
        }

        const normalizedFirstName = normalizeText(name);
        const normalizedLastName = normalizeText(surname);


        const key = `${normalizedFirstName}${normalizedLastName.charAt(0).toUpperCase()}${normalizedLastName.slice(1)}`;

        if (correctSurnames[key]) {
            setMessage(correctSurnames[key].message);
            setIsInvited(true);
        } else {
            setMessage('404 NOT FOUND');
            setIsInvited(false);
        }

        setFormVisible(false);
    };
    const getBack = () => {
        setFormVisible(true);
        setMessage('');
        setName('');
        setSurname('');
    }

    const googleCalendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=Colação+de+Grau&details=Minha+colação+de+grau!+Espero+você+l%C3%A1!&location=Minas+Centro,+Av.+Augusto+de+Lima,+785,+Centro,+Belo+Horizonte&dates=20240929T163000Z/20240929T193000Z`;

    return (
        <div className="invite-section">
            <h2>Convite especial</h2>
            {formVisible && (
                <>
                    <p>Digite o seu primeiro nome e seu último nome para ver o convite:</p>
                    <label htmlFor="nameSelect">Primeiro nome:</label>
                    <input
                        className="invite-input"
                        type="text"
                        id="nameSelect"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Digite seu nome"
                    />

                    <label htmlFor="surnameInput">Último nome:</label>
                    <input
                        type="text"
                        className="invite-input"
                        id="surnameInput"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        placeholder="Digite seu sobrenome"
                    />
                    <button className="invite-button" onClick={checkInvite}>Ver convite</button>
                </>
            )}

            <div id="inviteMessage" style={{marginTop: '20px', color: message === '404 NOT FOUND' ? 'red' : '#00FF00'}}>
                {message !== '' && message !== '404 NOT FOUND' && (
                    <>
                        <p>{message}</p>
                        {isInvited && (<><h2>
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Minas+Centro,+Av.+Augusto+de+Lima,+785,+Centro,+Belo+Horizonte"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Endereço: Minas Centro - Av. Augusto de Lima, 785 - Centro, Belo Horizonte
                            </a>
                        </h2><h2>Data: 29/09/2024 (Domingo) às 13:30h</h2><a href={googleCalendarLink} target="_blank"
                                                                             rel="noopener noreferrer">
                            <button className="invite-button">Adicionar ao calendário</button>
                        </a></>)}
                    </>
                )}

                {message === '404 NOT FOUND' && !isInvited && <><p>Nome não encontrado</p>
                    <button className="invite-button" onClick={() => getBack()}>Voltar</button>
                </>}
            </div>
            {isInvited && (
                <h3 style={{marginTop: '20px', color: '#00FF00'}}>
                    Com carinho,
                    <br/>
                    Matheus Augusto Moreira
                </h3>
            )}

        </div>

    );

};

export default Invite;
