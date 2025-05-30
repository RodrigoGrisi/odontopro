
/*
* Verificar se a data atual e igual a data do agendamento
*/
export function isToday(date: Date) {
  const now = new Date();

  const nowInSaoPaulo = new Date(now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
  const dateInSaoPaulo = new Date(date.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));

  return (
    nowInSaoPaulo.getDate() === dateInSaoPaulo.getDate() &&
    nowInSaoPaulo.getMonth() === dateInSaoPaulo.getMonth() &&
    nowInSaoPaulo.getFullYear() === dateInSaoPaulo.getFullYear()
  );
}

/** 
*  Verificar se o horario ja passou.
*/
export function isSlotInthePast(slotTime: string) {

  const [slotHour, slotMinute] = slotTime.split(":").map(Number);

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  if (slotHour < currentHour) {
    return true;
  } else {
    if (slotHour === currentHour && slotMinute < currentMinute) {
      return true;
    }
  }

  return false;

}

/** 
* Verificar se a sequencia de horarios estao disponiveis
* 
* @param startSlod - Primeiro horario disponivel
* @param requiredSlot - Quantidade de horários necessários
* @param allSlot - Todos os horários
* @param bloquedSlot - Horários bloqueados
*/
export function isSlotSequenceAvaliable(
  startSlod: string,
  requiredSlot: number,
  allSlot: string[],
  bloquedSlot: string[]

) {

  const startIndex = allSlot.indexOf(startSlod);

  if (startIndex === -1 || startIndex + requiredSlot > allSlot.length) {
    return false;
  }

  for (let i = startIndex; i < startIndex + requiredSlot; i++) {
    const slotTime = allSlot[i];

    if (bloquedSlot.includes(slotTime)) {
      return false;
    }

  }

  return true;

}