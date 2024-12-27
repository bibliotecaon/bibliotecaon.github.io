export async function verificaCPF(cpf) {

    if(!/^\d+$/.test(cpf.trim()) || cpf.length !== 11) {
        throw new Error('CPF inválido!')
    }

    let token = '17215|zfWomxi1zKfcFuCwDp0Dsu1kdmNR9Zlf';
    let url = `https://api.invertexto.com/v1/validator?token=${token}&type=cpf&value=${cpf}`;

    let api = await fetch(url, {
        method:'GET',
        headers: {
            'Content-Type':'application/json'
        }
    })

    if(api.ok) {
        let response = await api.json();
        if(!response.valid) {
            throw new Error('CPF inválido!')
        }
        return
    } 
    let responseError = await api.json();
    console.log(responseError)
    throw new Error('Erro desconhecido!')
}
