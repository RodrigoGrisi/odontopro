
/*
* Verificar se a data atual e igual a data do agendamento
*/
export function isToday(date: Date) {
  const now = new Date();
  
  return (
    now.getDate() === new Date(date).getDate() &&
    now.getMonth() === new Date(date).getMonth() &&
    now.getFullYear() === new Date(date).getFullYear()
  )

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