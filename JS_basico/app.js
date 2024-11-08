alert('Boas vindas ao jg do Ne secreto');
let numeroSecreto = 5;
let chute = prompt('Escolha um Ne entre 1 e 10');

if (chute == numeroSecreto ) {
    console.log('Vc acertou!!')
} else {
        console.log('VC errou o N° secreto!! E');   

        if (chute > numeroSecreto) {
            console.log('O N° secreto é menor')
        } else {
                console.log('O N° secreto é maior')
            } 
    }


