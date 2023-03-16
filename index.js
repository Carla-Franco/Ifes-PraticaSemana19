const fs = require('fs');

function listarCarros() {
    return new Promise((resolve, reject) => {
        fs.readFile('Carros.json', 'utf8', (erro, data) => {
            if (erro) {
                reject(erro);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

function cadastrarCarros(placa, nome, montadora) {
    return new Promise((resolve, reject) => {
        listarCarros()
            .then((Carros) => {
                Carros.push({ placa, nome, montadora });
                fs.writeFile('Carros.json', JSON.stringify(Carros), (erro) => {
                    if (erro) {
                        reject(erro);
                    } else {
                        resolve('Carro cadastrado com sucesso...');
                    }
                });
            })
            .catch((erro) => {
                reject(erro);
            });
    });
}

function menu() {
    console.log('Sistema de cadastro de carros');
    console.log('1 - Listar carros');
    console.log('2 - Cadastrar carros');
    console.log('0 - Sair');
}

async function main() {
    while (true) {
        menu();
        const opcao = Number(await question('Digite a opção desejada: '));
        switch (opcao) {
            case 0:
                console.log('Saindo do sistema...');
                process.exit(0);
                break;
            case 1:
                try {
                    const Carros = await listarCarros();
                    console.log(Carros);
                } catch (erro) {
                    console.error('Erro ao listar carros!', erro);
                }
                break;
            case 2:
                try {
                const placa = await question('Digite a placa do carro: ');
                const nome = await question('Digite o nome do carro: ');
                const montadora = await question('Digite a montadora do carro: ');
                const carro = await cadastrarCarros(placa, nome, montadora);
                console.log(carro);
                } catch (erro) {
                    console.error('Erro ao cadastrar carro:', erro);
                }
                break;
            default:
                console.log('Opção inválida...');
        }
        await question('Enter para continuar...');
    }
}

function question(text) {
    return new Promise((resolve, reject) => {
        const { stdin, stdout } = process;
        stdin.resume();
        stdout.write(text);
        stdin.on('data', (data) => {
            const resposta = data.toString().trim();
            resolve(resposta);
        });
        stdin.on('error', (erro) => {
            reject(erro);
        });
    });
}

main().catch((erro) => {
    console.error('Erro no sistema:', erro);
    process.exit(1);
});
