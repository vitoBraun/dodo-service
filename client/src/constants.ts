export const orderStatuses: { [key: string]: string } = {
  new: "⚡️ Новая",
  work: "♻️ В работе",
  done: "✅ Выполнено",
  closed: "🏁 Закрыто",
};

export const orderStatusesMenu: { [key: string]: string } = {
  new: "⚡️ Новые",
  work: "♻️ В работе",
  done: "✅ Выполненные",
  closed: "🏁 Закрытые",
};

export const brancheNames = [
  { id: "K1", name: "Адрес 1" },
  { id: "K2", name: "Адрес 2" },
  { id: "K3", name: "Адрес 3" },
];
export const managers = [
  { id: "1", name: "Алексей", branch: "K1" },
  { id: "2", name: "Вася", branch: "K1" },
  { id: "3", name: "Виктор", branch: "K2" },
  { id: "4", name: "Елена", branch: "K3" },
  { id: "5", name: "Женя", branch: "K2" },
  { id: "5", name: "Люся", branch: "K3" },
];

export const executors = [
  { id: "1", name: "Николай" },
  { id: "2", name: "Сергей" },
  { id: "3", name: "Геннадий Петрович" },
  { id: "4", name: "Гриша" },
];

export const faultIndexes = [
  { id: "1", description: "Косметический ремонт" },
  { id: "2", description: "Поломка мешает эксплуатации оборудования" },
  {
    id: "3",
    description: "Поломка повлияет на рейтинг стандартов, проеврку девелопером",
  },
  {
    id: "4",
    description:
      "Поломка нарушает безопасность эксплуатации пиццерии или влияет на прямой клиентский опыт",
  },
];
