library(ggplot2)
library(plotly)
data <- data.frame(x = c(1, 2, 3, 4, 5), y = c(2, 4, 1, 6, 3))
plot <- ggplot(data, aes(x, y)) +
         geom_point()
interactive_plot <- ggplotly(plot)

htmlwidgets::saveWidget(interactive_plot, "C:/Users/edgar/OneDrive/Documents/tec-2023/tallerInves--II/proyecto-final/indexR.html")
