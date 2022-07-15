**RF (Requisitos funcionais)**

**RNF (Requisitos não funcionais)**

**RN (Regras de negocócios)**

# Cadastro de carro

**RF** <br/>
Deve ser possível cadastrar um novo carro. <br/>

**RN** <br/>
Não deve ser possível cadastrar um carro com uma placa já existente. <br/>
O carro deve ser cadastradado, por padrão, com disponibilidade. <br/>
O usuário reponsável pelo cadastro deve ser um usuário administrador. <br/>

# Listagem de carro

**RF** <br/>
Deve ser possível listar todos os carros disponíveis. <br/>
Deve ser possível listar todos os carros disponíveis pelo nome da marca. <br/>
Deve ser possível listar todos os carros disponíveis pelo nome da categoria. <br/>
Deve ser possível listar todos os carros disponíveis pelo nome do carro. <br/>

**RN** <br/>
O usuário não precisa estar logado no sistema. <br/>

# Cadastro de Especificação no carro

**RF** <br/>
Deve ser possível cadastrar uma especificação para um carro. <br/>
Deve ser possivel listar todas as especificações. <br/>
Deve ser possível listar todos os carros. <br/>

**RN** <br/>
Não deve ser possivel cadastrar um especificação para um carro não cadastrado. <br/>
Não deve ser possivel cadastrar uma especificação já existente para o mesmo carro. <br/>
O usuário reponsável pelo cadastro deve ser um usuário administrador. <br/>

# Cadastro de imagens do carro

**RF** <br/>
Deve ser possível cadastrar a imagem do carro. <br/>
Deve ser possível listar todos os carros <br/>

**RNF** <br/>
Utilizar o multer para upload dos arquivos. <br/>

**RN** <br/>
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro. <br/>
O usuário reponsável pelo cadastro deve ser um usuário administrador. <br/>

# Aluguel de carro

**RF** <br/>
Deve ser possível cadastrar um aluguel. <br/>

**RN** <br/>
O aluguel deve ter duração minima de 24 horas. <br/>
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário. <br/>
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro. <br/>
