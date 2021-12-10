import { format } from 'date-fns';
import ruLocale from "date-fns/locale/ru";

export const dateTimeToHuman = (date: string) => {
  return format(new Date(date), "p PPPP", { locale: ruLocale })
}
