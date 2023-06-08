library(ggplot2)

datos <- read.csv("C:/Users/edgar/OneDrive/Documents/tec-2023/tallerInves--II/proyecto-final/dataCSV.csv")
grafica <- ggplot(datos, aes(x = materia, y = nombre)) +
  geom_point() + labs(title = "Grafica de puntos", x = "Materias", y = "Nombres")

graficaBar <- ggplot(datos, aes(x = puntaje, y = nombre)) +
  geom_bar(stat = "identity") +
  labs(title = "Grafica de puntaje en aprendizaje", x = "Puntaje", y = "Nombres")

ggsave("C:/Users/edgar/OneDrive/Documents/tec-2023/tallerInves--II/proyecto-final/public/images/grafica.png",plot = grafica,dpi = 300)
ggsave("C:/Users/edgar/OneDrive/Documents/tec-2023/tallerInves--II/proyecto-final/public/images/graficaBar.png",plot = graficaBar,dpi = 300)