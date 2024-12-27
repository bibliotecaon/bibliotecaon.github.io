export async function verificaCPF(cpf) {

    if(!/^\d+$/.test(cpf.trim()) ) {
        throw new Error('CPF inválido!')
    }

    let token = '17214|fFszoUV77Ri3jx2R9kxpsEcxWfXMRJrL';
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
}
