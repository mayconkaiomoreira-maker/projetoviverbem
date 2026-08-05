import ansiedade from "@/assets/ansiedade.jpg";
import alimentacao from "@/assets/alimentacao.jpg";
import autoestima from "@/assets/autoestima.jpg";
import pressao from "@/assets/pressao.jpg";
import redes from "@/assets/redes.jpg";
import expressar from "@/assets/expressar.jpg";

export type Topic = {
  slug: string;
  title: string;
  short: string;
  image: string;
  alt: string;
  what: string;
  symptoms: string[];
  how: string;
  tips: string[];
};

export const topics: Topic[] = [
  {
    slug: "ansiedade",
    title: "Ansiedade",
    short: "Quando a mente antecipa perigos que ainda não existem.",
    image: ansiedade,
    alt: "Ilustração de um jovem envolvido por formas translúcidas representando ansiedade",
    what: "A ansiedade é uma resposta natural do corpo diante de situações de risco ou incerteza. Ela se torna um problema quando aparece com muita frequência, sem motivo claro, e passa a atrapalhar o sono, os estudos e as relações. Entre estudantes, provas, apresentações e o medo de decepcionar costumam ser gatilhos comuns.",
    symptoms: [
      "Preocupação constante",
      "Insônia",
      "Medo excessivo",
      "Dificuldade de concentração",
      "Irritabilidade",
    ],
    how: "Nomear o que se sente já é um primeiro passo. Criar rotinas previsíveis, cuidar do sono e dividir grandes tarefas em partes menores reduz a sensação de sobrecarga. Buscar ajuda profissional não é exagero: é cuidado.",
    tips: [
      "Conversar com alguém de confiança",
      "Procurar ajuda profissional",
      "Praticar exercícios físicos",
      "Usar técnicas de respiração",
      "Reduzir o excesso de estímulos",
    ],
  },
  {
    slug: "ma-alimentacao",
    title: "Má alimentação",
    short: "O que você come também conversa com a sua mente.",
    image: alimentacao,
    alt: "Tigela de vidro com frutas frescas sobre fundo claro",
    what: "Rotinas corridas, lanches rápidos e refeições puladas afetam muito mais do que o corpo. A alimentação irregular influencia energia, humor, concentração e até a qualidade do sono. Entre jovens, a pressão estética também transforma a comida em fonte de culpa.",
    symptoms: [
      "Cansaço frequente ao longo do dia",
      "Oscilações de humor",
      "Dificuldade de concentração nas aulas",
      "Dores de cabeça e mal-estar",
      "Culpa ou ansiedade ao comer",
    ],
    how: "O objetivo não é uma dieta perfeita, e sim uma relação mais tranquila com a comida. Refeições em horários parecidos, mais água e menos ultraprocessados já mudam o dia.",
    tips: [
      "Manter horários regulares para as refeições",
      "Levar lanches simples para a escola",
      "Beber água ao longo do dia",
      "Evitar dietas restritivas sem orientação",
      "Conversar com um nutricionista quando possível",
    ],
  },
  {
    slug: "baixa-autoestima",
    title: "Baixa autoestima",
    short: "A forma como você fala consigo mesmo importa.",
    image: autoestima,
    alt: "Ilustração de um jovem diante de um espelho oval",
    what: "Autoestima é o valor que atribuímos a nós mesmos. Quando está baixa, cada erro vira prova de incapacidade e cada comparação vira ferida. Isso costuma nascer de críticas repetidas, comparações constantes e padrões inalcançáveis.",
    symptoms: [
      "Autocrítica excessiva",
      "Medo de errar ou de tentar",
      "Comparação constante com outras pessoas",
      "Dificuldade de aceitar elogios",
      "Isolamento social",
    ],
    how: "Autoestima se constrói com pequenas evidências. Reconhecer conquistas, cercar-se de pessoas que somam e tratar a si mesmo com a gentileza que você oferece a um amigo faz diferença real.",
    tips: [
      "Registrar pequenas conquistas do dia",
      "Reduzir comparações nas redes sociais",
      "Praticar atividades que você faz bem",
      "Conversar com alguém de confiança",
      "Buscar acompanhamento psicológico",
    ],
  },
  {
    slug: "pressao-escolar",
    title: "Pressão escolar",
    short: "Notas não medem o seu valor.",
    image: pressao,
    alt: "Pilha de livros com um relógio despertador em cima",
    what: "Provas, vestibular, expectativas da família e comparação entre colegas criam uma cobrança contínua. A pressão em excesso deixa de motivar e passa a paralisar, gerando exaustão e medo constante de falhar.",
    symptoms: [
      "Cansaço mental mesmo após descansar",
      "Procrastinação e bloqueio para estudar",
      "Crises de choro perto das provas",
      "Sono irregular",
      "Sensação de nunca ser suficiente",
    ],
    how: "Organizar o estudo em blocos curtos, com pausas reais, protege a mente. Falar abertamente sobre expectativas com família e professores costuma aliviar boa parte do peso.",
    tips: [
      "Dividir o conteúdo em metas pequenas",
      "Fazer pausas programadas",
      "Dormir de 7 a 9 horas",
      "Pedir ajuda a professores e colegas",
      "Lembrar que uma nota não define o futuro",
    ],
  },
  {
    slug: "redes-sociais",
    title: "Excesso de redes sociais",
    short: "Rolagem infinita, atenção fragmentada.",
    image: redes,
    alt: "Celular flutuando com bolhas de notificação",
    what: "As redes conectam, mas também expõem uma vitrine editada da vida dos outros. O uso excessivo rouba horas de sono, fragmenta a atenção e alimenta a comparação constante, especialmente na adolescência.",
    symptoms: [
      "Checar o celular sem perceber",
      "Dificuldade de manter o foco",
      "Sono reduzido pelo uso à noite",
      "Comparação e inveja frequentes",
      "Ansiedade quando fica sem o celular",
    ],
    how: "Não se trata de abandonar as redes, mas de retomar o controle do tempo. Limites simples devolvem horas ao dia e reduzem o ruído mental.",
    tips: [
      "Definir horários livres de tela",
      "Desativar notificações não essenciais",
      "Deixar o celular longe da cama",
      "Seguir perfis que fazem bem",
      "Reduzir o excesso de estímulos à noite",
    ],
  },
  {
    slug: "dificuldade-de-se-expressar",
    title: "Dificuldade de se expressar",
    short: "Sentir muito e não conseguir colocar em palavras.",
    image: expressar,
    alt: "Dois balões de fala, um neutro e outro azul brilhante",
    what: "Muitos jovens aprendem cedo a esconder o que sentem por medo de julgamento. Guardar tudo cria distância nas relações e faz com que problemas simples cresçam em silêncio.",
    symptoms: [
      "Evitar falar sobre sentimentos",
      "Medo de julgamento",
      "Explosões emocionais pontuais",
      "Sensação de solidão mesmo acompanhado",
      "Dificuldade de pedir ajuda",
    ],
    how: "Expressar-se é uma habilidade que se treina. Começar por escrito, com poucas pessoas ou em espaços seguros, torna a conversa mais fácil com o tempo.",
    tips: [
      "Escrever o que sente antes de falar",
      "Começar por uma pessoa de confiança",
      "Usar frases no formato \"eu sinto...\"",
      "Participar de grupos ou rodas de conversa",
      "Procurar apoio psicológico na escola",
    ],
  },
];
