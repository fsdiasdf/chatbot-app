var fluxo = "INICIO";
// leitor de qr code
const qrcode = require('qrcode-terminal');
const { Client} = require('whatsapp-web.js'); // Mudança Buttons
const client = new Client();
// serviço de leitura do qr code
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
    qrcode.toCanvas(canvas, 'sample text', function (error) {
        if (error) console.error(error)
        console.log('success!');
      })
});
// apos isso ele diz que foi tudo certo
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});
// E inicializa tudo 
client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms)); // Função que usamos para criar o delay entre uma ação e outra

// Funil
client.on('message', async msg => {
    if(fluxo == "INICIO") {
        if (msg.body.match(/(dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i) && msg.from.endsWith('@c.us')) {

            const chat = await msg.getChat();

            await delay(3000); //delay de 3 segundos
            await chat.sendStateTyping(); // Simulando Digitação
            await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
            const contact = await msg.getContact(); //Pegando o contato
            const name = contact.pushname; //Pegando o nome do contato
            await client.sendMessage(msg.from,'Olá, '+ name.split(" ")[0] + ' e seja bem-vindo ao Chácara Refúgio dos Pássaros!\n\n Ficamos felizes com o seu interesse em nossos espaço para eventos.'); //Primeira mensagem de texto

            await delay(3000); //delay de 3 segundos
            await chat.sendStateTyping(); // Simulando Digitação
            await delay(3000);
            await client.sendMessage(msg.from, 'Afim de agilizar e proporcionar um atendimento personalizado, pedimos que por favor, digite a opção referente a modalidade de aluguel de seu intersse:\n\n1 - Day Use (Grupos de até 20 pessoas)\n2 - Eventos (Grupos acima de 20 pessoas)\n3 - Hospedagem (Mínimo de 2 diárias)');

            fluxo = "OPCOES"
        }
    }
    if (msg.body !== null && msg.body === '1' && msg.from.endsWith('@c.us') && fluxo == "OPCOES") {
        const chat = await msg.getChat();

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Legal! Então a sua opção é o *DAY USE* _(Grupo de até 20 pessoas)_, certo? Bom, vou explicar um pouco como funciona essa modalidade de aluguel!');

        await delay(8000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(8000);
        await client.sendMessage(msg.from, '*COMO FUNCIONA?*\nNessa modalidade de aluguel você e mais 19 pessoas vão desfrutar de todo o nosso espaço de lazer, que consistem em:\n\n-Salão com churrasqueira\n\n-Piscina\n\n-Campo de Futebol\n\n-Jardim Amplo');

        await delay(8000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(8000);
        await client.sendMessage(msg.from, 'Nossa estrutura está pronta para atender grupos de 20 pessoas confortavelmente, ou seja, você não precisará se preocupar com aluguel de mesas e cadeiras.');


        await delay(5000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(5000);
        await client.sendMessage(msg.from, 'Agora precisamos que nos informe a *Data* de seu interesse para que possamos verificar se ela está disponível, OK?');
        
        fluxo = "FIM"
    }

    if (msg.body !== null && msg.body === '2' && msg.from.endsWith('@c.us') && fluxo == "OPCOES") {
        const chat = await msg.getChat();


        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Entendi, então sua opção é a *EVENTO* _(Grupos acima de 20 pessoas), certo? Bom, vou explicar um pouco como funciona essa modalidade de aluguel!');

        await delay(8000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(8000);
        await client.sendMessage(msg.from, '*COMO FUNCIONA?*\nNessa modalidade você precisará nos informar qual a quantidade total de pessoas estarão no local no dia do evento e qual o tipo de envento será realizado na data.');

        
        await delay(8000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(8000);
        await client.sendMessage(msg.from, '*O QUE ESTÁ DISPONÍVEL?*\nEstará à sua disposição todo o nosso espaço de lazer, que consistem em:\n\n-Salão com churrasqueira\n\n-Piscina\n\n-Campo de Futebol\n\n-Jardim Amplo');


        await delay(8000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(8000);
        await client.sendMessage(msg.from, 'Nossa estrutura está pronta para atender grupos de até 20 pessoas confortavelmente, portanto número de pessoas acima dessa quantidade fica a cargo do Locatário a montagem da estrutura conforme sua necessidade.');


        await delay(5000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(5000);
        await client.sendMessage(msg.from, 'Agora precisamos que nos informe *Quantidade de pessoas*, *Tipo de evento* e a *Data* de seu interesse para que possamos verificar se ela está disponível, OK?');

        fluxo = "FIM"
    }

    if (msg.body !== null && msg.body === '3' && msg.from.endsWith('@c.us') && fluxo == "OPCOES") {
        const chat = await msg.getChat();

        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'PERFEITO! Então sua opção é a *HOSPEDAGEM* _(Mínimo de 2 diárias)_, certo? Bom, vou explicar um pouco como funciona essa modalidade de aluguel!');

        await delay(8000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(8000);
        await client.sendMessage(msg.from, '*COMO FUNCIONA?*\nPensamos nessa modalidade especialmente para que você e seu grupo possam aproveitar não apenas o nosso incrível espaço de lazer, mas também a nossa acolhedora casa! Com capacidade para até 14 pessoas, a Chácara Refúgio dos Pássaros é o lugar perfeito para momentos inesquecíveis com amigos e familiares.');

        await delay(5000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(5000);
        await client.sendMessage(msg.from, 'Agora precisamos que nos informe a *Data* de seu interesse para que possamos verificar se ela está disponível, OK?');

        fluxo = "FIM"
    }

});