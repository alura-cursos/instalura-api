# API Instalura
## Execução
Para executar a API, basta acessar a pasta raiz `instalura-api` pelo terminal e executar os comandos a seguir para instalar as dependências e iniciar a API, respectivamente:
```
npm install
npm start
```
Logo após, a API rodará em `http://localhost:3030`.
## Endpoints
### Criação de novo usuário
```
- REQUEST
[POST] http://localhost:3030/users/signup
[BODY]
{
    userName: 'usuario1',
    password: 'abc123',
    userProfilePhotoUrl: 'http://usuario1.com.br'
}
[HEADERS]
{
    Content-type: 'application/json'
}

- RESPONSE
[SUCESSO]
    [STATUS] 204

[ERRO]
    [STATUS] 50x
    [BODY]
        {
            message: 'Mensagem de erro...'
        }
```
O campo `userName` deve conter o valor do campo login, `password` a senha e `userProfilePhotoUrl` a URL do perfil do novo usuário. Campos esses encontrados no formulário de cadastro de usuários na aplicação Instalura.

### Login
```
- REQUEST
[POST] http://localhost:3030/users/login
[BODY]
{
    userName: 'usuario1',
    password: 'abc123'
}
[HEADERS]
{
    Content-type: 'application/json'
}

- RESPONSE
[SUCESSO]
    * Autenticado
        [STATUS] 200
        [BODY]
        {
            id: 1,
            name: 'usuario1'
        }
        [HEADERS]
        {
            x-access-token: 'jviorwnjinwn241'
        }

    * Não Autenticado
        [STATUS] 401
        [BODY]
        {
            message: 'Falha na autenticação do usuário usuario1!'
        }
        
[ERRO]
    [STATUS] 50x
    [BODY]
    {
        message: 'Mensagem de erro...'
    }
```
O cabeçalho `x-access-token` devolvido é o cabecalho que deve ser trafegado após o login para que a API reconheça o usuário.

### Listagem de fotos
```
- REQUEST
[GET] http://localhost:3030/:userName/photos
[HEADERS]
{
    x-access-token: 'jviorwnjinwn241'
}

- RESPONSE
[SUCESSO]
    [STATUS] 200
    [BODY]
    [
        {
            allowComments: false,
            comments: 0,
            description: "comentario da foto",
            id: 2,
            likes: 0,
            postDate: "2018-02-13T12:30:25.000Z",
            url: "https://instagram.fcgh9-1.fna.fbcdn.net/t51.2885-15/e35/15276770_381074615568085_8052939980646907904_n.jpg?ig_cache_key=MTM5ODY4MDMyNjYyMDA1MDE4OQ%3D%3D.2",
            userId: 1
        }
    ]
[ERRO]
    [STATUS] 50x
    [BODY]
    {
        message: 'Mensagem de erro...'
    }
```
O retorno da requisição é um *array* com a listagem de fotos do usuário cujo `userName` foi informado na URL da requisição com o *path param* `:userName`.
### Remoção de fotos
```
- REQUEST
[DELETE] http://localhost:3000/photos/:photoId
[HEADERS]
{
    x-access-token: 'jviorwnjinwn241'
}

- RESPONSE
[SUCESSO]
    * Sucesso na remoção
        [STATUS] 200
    
    * Foto não existente
        [STATUS] 404
        [BODY]
        {
            message: 'Foto não existe!'
        }
    
    * Usuário não autorizado para exclusão
        [STATUS] 403
        [BODY]
        {
            message: 'Forbidden: Sem autorização para a operação!'
        }
    
[ERRO]
    [STATUS] 50x
    [BODY]
    {
        message: 'Mensagem de erro...'
    }
```
O *path param* `:photoId` passado na URL deve ser o ID da foto a ser excluída e é obrigatório a passagem do cabecalho `x-access-token`.