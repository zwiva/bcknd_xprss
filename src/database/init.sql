DROP DATABASE diario;
CREATE DATABASE diario;
USE diario;


/* CREATES */

CREATE TABLE STATUS (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  CONSTRAINT PK_status PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE SECTION (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  img VARCHAR(255) NOT NULL,
  CONSTRAINT PK_section PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE ROLE (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  CONSTRAINT PK_role PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE PERSON (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  surname VARCHAR(100) NOT NULL,
  rut VARCHAR(20) NOT NULL UNIQUE,
  CONSTRAINT PK_person PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE USER (
  id INT NOT NULL AUTO_INCREMENT,
  id_role INT NOT NULL,
  id_person INT NOT NULL,
  id_status INT NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  pass VARCHAR(255) NOT NULL,
  CONSTRAINT PK_user PRIMARY KEY (id),
  CONSTRAINT FK_user_idrole_role_id FOREIGN KEY (id_role) references ROLE(id),
  CONSTRAINT FK_user_idperson_person_id FOREIGN KEY (id_person) references PERSON(id)
) ENGINE=InnoDB;

CREATE TABLE ARTICLE (
  id INT NOT NULL AUTO_INCREMENT,
  id_user INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  img VARCHAR(255) NOT NULL,
  createdDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updateDate DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  urlRecomend VARCHAR(255) NOT NULL,
  id_section INT NOT NULL,
  id_status INT NOT NULL,
  CONSTRAINT PK_article PRIMARY KEY (id),
  CONSTRAINT FK_article_idsection_section_id FOREIGN KEY (id_section) references SECTION(id),
  CONSTRAINT FK_article_idstatus_status_id FOREIGN KEY (id_status) references STATUS(id),
  CONSTRAINT FK_article_iduser_user_id FOREIGN KEY (id_user) references USER(id)
) ENGINE=InnoDB;

CREATE TABLE CONTENT (
  id INT NOT NULL AUTO_INCREMENT,
  position INT NOT NULL,
  paragraph TEXT,
  img VARCHAR(255),
  id_article INT NOT NULL,
  CONSTRAINT PK_content PRIMARY KEY (id),
  CONSTRAINT FK_content_idarticle_article_id FOREIGN KEY (id_article) references ARTICLE(id)
) ENGINE=InnoDB;


/* INSERTS */

INSERT INTO STATUS (
  name
) values (
  'Activo'
), (
  'Inactivo'
);

INSERT INTO ROLE (
  name 
) VALUES (
  'Administrador'
), (
  'Periodista'
), (
  'Lectro free'
), (
  'Lector pago'
);

INSERT INTO PERSON (
  name ,
  lastname ,
  surname ,
  rut 
) VALUES (
  'Andrea',
  'Castro',
  'Castellón',
  '123456789'
);

INSERT INTO USER (
  id_role ,
  id_person ,
  id_status ,
  email ,
  pass 
) VALUES (
  1,
  1,
  1,
  'andrea@mail.cl',
  '$2b$05$Mb29ZpEUgGnzolCM3/gWSuuPbC5D9nyBW9eGL0XA85m60e.ZOikDK'
);

INSERT INTO `SECTION` (
  name,
  description ,
  img 
) values (
  'Medicina',
  'Explora cómo la inteligencia artificial está transformando la medicina, desde diagnósticos precisos hasta el desarrollo de tratamientos innovadores.',
  'https://www.newmedicaleconomics.es/wp-content/uploads/2023/09/concepto-medico-inteligencia-artificial-medicina-ia-diagnostico-asistido-ia-scaled.jpg'
),
(
  'Herramientas y tecnologías',
  'Conoce las herramientas y tecnologías más recientes que impulsan el desarrollo y la implementación de IA en diversos campos.',
  'https://www.questionpro.com/blog/wp-content/uploads/2023/10/2523-Portada-herramientas-de-inteligencia-artificial.jpg'
),
(
  'Ética y regulación',
  'Discute los aspectos éticos y las regulaciones necesarias para el desarrollo y uso responsable de la inteligencia artificial en la sociedad.',
  'https://i0.wp.com/revistaidees.cat/wp-content/uploads/2020/02/AAFF-REFLEXION-SOBRE-LA-ETICA-2000X800.jpg?fit=2000%2C800&ssl=1'
),
(
  'Seguridad',
  'Analiza las amenazas y las soluciones de seguridad en el ámbito de la inteligencia artificial, con un enfoque en la protección de datos y sistemas.',
  'https://cdn-3.expansion.mx/dims4/default/173493f/2147483647/strip/true/crop/1328x790+0+0/resize/1800x1071!/format/webp/quality/80/?url=https%3A%2F%2Fcdn-3.expansion.mx%2Fdd%2Fc8%2F684fa2cf4c059f582c8f65032ff0%2Fia-etica.jpg'
),
(
  'Privacidad',
  'Examina los desafíos y las estrategias para proteger la privacidad de los usuarios en aplicaciones impulsadas por IA.',
  'https://www.unir.net/wp-content/uploads/2023/04/eticaia2.jpg'
),
(
  'Automotriz',
  'Explora los avances en inteligencia artificial aplicados a la industria automotriz, como los vehículos autónomos y la optimización del transporte.',
  'https://cgce.cl/wp-content/uploads/2023/11/shutterstock_1095302834.jpg'
),
(
  'Innovación',
  'Descubre las ideas y proyectos más innovadores en el ámbito de la inteligencia artificial que están cambiando el mundo.',
  'https://s1.elespanol.com/2019/07/14/castilla-y-leon/castilla_y_leon_413721912_204291006_1706x960.jpg'
),
(
  'Educación',
  'Investiga cómo la inteligencia artificial está mejorando la educación mediante la personalización del aprendizaje y nuevas metodologías.',
  'https://institutoeducaccion.org/wp-content/uploads/2024/04/image-98-1024x574-1.jpg'
),
(
  'Hogar',
  'Conoce las aplicaciones de la inteligencia artificial en el hogar, desde asistentes virtuales hasta electrodomésticos inteligentes.',
  'https://i0.wp.com/criptotendencia.com/wp-content/uploads/2024/03/IoT.jpg?fit=1280%2C731&ssl=1'
),
(
  'Robótica',
  'Explora el mundo de la robótica y su relación con la inteligencia artificial en la creación de sistemas autónomos y robots inteligentes.',
  'https://www.lavanguardia.com/andro4all/hero/2023/10/fabrica-de-robots.png?width=768&aspect_ratio=16:9&format=nowebp'
),
(
  'Investigación y Desarrollo',
  'Un vistazo a los avances más recientes en investigación y desarrollo en el campo de la inteligencia artificial.',
  'https://newsweekespanol.com/wp-content/uploads/2024/03/inteligencia-artificial-investigacion-scaled.webp'
),
(
  'Entrevistas y Opinión',
  'Lee entrevistas con expertos y opiniones sobre las tendencias, desafíos y el futuro de la inteligencia artificial.',
  'https://portal.ucm.cl//content/uploads/bfi_thumb/Nobel-Fisica-2024-IA-qvb1ihokbnm606l81rzcb6f0winmg984sj2femf33u.jpg'
),
(
  'Proyectos y Tutoriales',
  'Encuentra proyectos prácticos y tutoriales para aprender a implementar inteligencia artificial en diversos campos.',
  'https://www.coit.es/sites/default/files/news/418006.jpg'
),
(
  'Eventos y Conferencias',
  'Mantente informado sobre los próximos eventos y conferencias en inteligencia artificial alrededor del mundo.',
  'https://i0.wp.com/criptotendencia.com/wp-content/uploads/2023/07/IA.jpg?fit=1456%2C816&ssl=1'
);

-- 1. Sección: Medicina (id: 1)

INSERT INTO ARTICLE (id_user, title, summary, img, urlRecomend, id_section, id_status) VALUES
(1, "El impacto de la IA en los diagnósticos médicos", 
"La inteligencia artificial está ayudando a los médicos a identificar enfermedades con mayor precisión y rapidez.", 
"https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", 
"https://www.ejemplo.com/ia-diagnosticos", 1, 1),
(1, "Robots quirúrgicos impulsados por inteligencia artificial", 
"Cómo los robots quirúrgicos están revolucionando las operaciones con el apoyo de la IA.", 
"https://controlpublicidad.com/wp-content/uploads/2024/05/aplicacion-de-la-inteligencia-artificial-en-la-industria-de-los-eventos-081522.jpg", "https://www.ejemplo.com/ia-robots-quirurgicos", 1, 1),
(1, "Predicción de brotes de enfermedades con IA", 
"La inteligencia artificial permite predecir epidemias y pandemias mediante el análisis de datos.", 
"https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", "https://www.ejemplo.com/ia-brotes", 1, 1),
(1, "Análisis de imágenes médicas con aprendizaje profundo", 
"El aprendizaje profundo ha mejorado significativamente el análisis de imágenes médicas como rayos X y resonancias.", 
"https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", "https://www.ejemplo.com/ia-imagenes-medicas", 1, 1),
(1, "Terapias personalizadas con inteligencia artificial", 
"La IA permite crear tratamientos específicos para cada paciente, mejorando los resultados.", 
"https://micecatering.com/wp-content/uploads/2024/01/ia-eventos.jpg", "https://www.ejemplo.com/ia-terapias", 1, 1);

INSERT INTO CONTENT (
  `position` ,
  paragraph ,
  img ,
  id_article 
) VALUES
-- Contenido para "El impacto de la IA en los diagnósticos médicos"
(1, 
"La inteligencia artificial está transformando los diagnósticos médicos al analizar grandes volúmenes de datos de pacientes, permitiendo identificar patrones y anomalías que antes podían pasar desapercibidas.", 
"https://www.mercadosyfinanzas.com/wp-content/uploads/2024/02/las-preguntas-mas-frecuentes-sobre-la-realidad-virtual-y-la-inteligencia-artificial.jpg", 
1),
(2, "Un ejemplo notable es el uso de modelos de machine learning en el análisis de imágenes, como rayos X, tomografías y resonancias magnéticas, que mejora la precisión y reduce los errores médicos.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 1),
(3, "Además, los sistemas de IA están ayudando a los médicos a priorizar casos críticos, agilizando el proceso de diagnóstico y optimizando los recursos hospitalarios.", "https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", 1),

-- Contenido para "Robots quirúrgicos impulsados por inteligencia artificial"
(1, "Los robots quirúrgicos asistidos por inteligencia artificial están permitiendo realizar procedimientos más precisos y menos invasivos, reduciendo los tiempos de recuperación de los pacientes.", "https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", 2),
(2, "Estos sistemas analizan en tiempo real los movimientos del cirujano y los datos del paciente, ofreciendo sugerencias o ajustes automáticos durante la operación.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 2),
(3, "Un ejemplo destacado es el robot Da Vinci, que utiliza tecnología avanzada para realizar cirugías complejas con incisiones mínimas y mayor control.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 2),

-- Contenido para "Predicción de brotes de enfermedades con IA"
(1, "Mediante el análisis de datos de salud pública, la inteligencia artificial permite identificar patrones que podrían indicar el inicio de brotes epidémicos o pandemias.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 3),
(2, "Por ejemplo, plataformas como BlueDot utilizan algoritmos de IA para rastrear enfermedades emergentes en tiempo real, ayudando a las autoridades a tomar decisiones informadas.", "https://controlpublicidad.com/wp-content/uploads/2024/05/aplicacion-de-la-inteligencia-artificial-en-la-industria-de-los-eventos-081522.jpg", 3),
(3, "Estas tecnologías también analizan factores como el clima, la densidad de población y los movimientos migratorios para predecir con mayor precisión la propagación de enfermedades.", "https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", 3),

-- Contenido para "Análisis de imágenes médicas con aprendizaje profundo"
(1, "El aprendizaje profundo ha revolucionado el análisis de imágenes médicas, logrando identificar anomalías en rayos X, tomografías y resonancias magnéticas con una precisión impresionante.", "https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", 4),
(2, "Redes neuronales convolucionales entrenadas con millones de imágenes permiten detectar cánceres, fracturas y otras condiciones de manera más rápida que los métodos tradicionales.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 4),
(3, "Estos avances no solo mejoran los resultados para los pacientes, sino que también reducen la carga de trabajo de los radiólogos y otros especialistas.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 4),

-- Contenido para "Terapias personalizadas con inteligencia artificial"
(1, "La inteligencia artificial está revolucionando la medicina personalizada al analizar datos genéticos, clínicos y de estilo de vida para diseñar tratamientos específicos para cada paciente.", "https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", 5),
(2, "Por ejemplo, los algoritmos de IA pueden predecir cómo responderá un paciente a un medicamento, optimizando así la elección del tratamiento.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 5),
(3, "Además, estos sistemas están facilitando el desarrollo de nuevas terapias dirigidas, que tienen mayor efectividad y menos efectos secundarios.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 5);

-- 2. Sección: Herramientas y Tecnologías (id: 2)

INSERT INTO ARTICLE (id_user, title, summary, img, urlRecomend, id_section, id_status) VALUES
(1, "Plataformas de IA más utilizadas en 2024", "Un análisis de las herramientas de inteligencia artificial más populares del año.", 
"https://www.mercadosyfinanzas.com/wp-content/uploads/2024/02/las-preguntas-mas-frecuentes-sobre-la-realidad-virtual-y-la-inteligencia-artificial.jpg", "https://www.ejemplo.com/plataformas-ia", 2, 1),
(1, "Herramientas de código abierto para implementar IA", "Descubre las mejores herramientas open source para desarrollar proyectos de inteligencia artificial.", 
"https://www.mercadosyfinanzas.com/wp-content/uploads/2024/02/las-preguntas-mas-frecuentes-sobre-la-realidad-virtual-y-la-inteligencia-artificial.jpg", "https://www.ejemplo.com/herramientas-open-source", 2, 1),
(1, "Comparativa de frameworks de machine learning", "TensorFlow vs PyTorch: ¿Cuál es mejor para tu proyecto?", 
"https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", "https://www.ejemplo.com/comparativa-ml", 2, 1),
(1, "El papel de los procesadores gráficos en la IA", "Cómo las GPUs están potenciando la inteligencia artificial en tareas de aprendizaje profundo.", 
"https://binduevents.com/wp-content/uploads/2024/06/Inteligencia-artificial-eventos-3.jpg", "https://www.ejemplo.com/gpus-ia", 2, 1),
(1, "IA generativa: herramientas para crear contenido único", "Explora herramientas que utilizan IA generativa para producir imágenes, textos y videos.", 
"https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", "https://www.ejemplo.com/ia-generativa", 2, 1);

INSERT INTO CONTENT (
  `position` ,
  paragraph ,
  img ,
  id_article 
) VALUES
-- Contenido para "Plataformas de IA más utilizadas en 2024"
(1, "Entre las plataformas más populares en 2024 se destacan herramientas como OpenAI, que ofrece modelos avanzados para procesamiento de lenguaje y generación de contenido.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 6),
(2, "Google Cloud AI se ha consolidado como una solución poderosa para integrar modelos de machine learning en aplicaciones empresariales.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 6),
(3, "Otro actor destacado es Microsoft Azure AI, que proporciona servicios escalables y personalizables para implementar inteligencia artificial en distintos entornos.", "https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", 
6),

-- Contenido para "Herramientas de código abierto para implementar IA"
(1, "TensorFlow y PyTorch son dos de las herramientas de código abierto más utilizadas para proyectos de inteligencia artificial, debido a su flexibilidad y comunidad activa.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 7),
(2, "Además, Jupyter Notebooks se ha convertido en una opción esencial para científicos de datos al permitirles documentar y probar código de manera interactiva.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png",7),
(3, "Otros proyectos como Scikit-learn y Hugging Face están revolucionando áreas como el aprendizaje automático tradicional y los modelos de lenguaje, respectivamente.","https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png",
7),

-- Contenido para "Comparativa de frameworks de machine learning"
(1, "TensorFlow ofrece una gran escalabilidad y soporte empresarial, siendo ideal para proyectos grandes y aplicaciones de producción.", "https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", 8),
(2, "Por otro lado, PyTorch destaca por su facilidad de uso y flexibilidad, lo que lo hace popular entre investigadores y desarrolladores en etapa experimental.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 8),
(3, "Ambos frameworks tienen ventajas únicas, pero la elección dependerá de las necesidades específicas del proyecto y del equipo.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 8),

-- Contenido para "El papel de los procesadores gráficos en la IA"
(1, "Las GPUs han sido fundamentales en el avance de la inteligencia artificial, permitiendo entrenar modelos de aprendizaje profundo de manera más rápida y eficiente.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 9),
(2, "NVIDIA es líder en este sector, ofreciendo GPUs especializadas como las de la serie RTX y la tecnología CUDA para desarrolladores.", "https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", 9),
(3, "El uso de GPUs ha reducido significativamente el tiempo de entrenamiento de modelos complejos, acelerando el ritmo de innovación en IA.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 9),

-- Contenido para "IA generativa: herramientas para crear contenido único"
(1, "Las herramientas de IA generativa, como DALL·E y Stable Diffusion, están permitiendo la creación de imágenes únicas a partir de descripciones textuales.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 10),
(2, "GPT-4 de OpenAI es ampliamente utilizado para generar textos de alta calidad, desde artículos hasta guiones creativos.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 10),
(3, "Además, plataformas como Runway AI están explorando el potencial de la IA generativa en la producción de videos innovadores y personalizados.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 10);


-- 3. Sección: Ética y Regulación (id: 3)

INSERT INTO ARTICLE (id_user, title, summary, img, urlRecomend, id_section, id_status) VALUES
(1, "Aspectos éticos de la inteligencia artificial en el trabajo", 
"Cómo equilibrar la automatización con los derechos laborales.", 
"https://www.mercadosyfinanzas.com/wp-content/uploads/2024/02/las-preguntas-mas-frecuentes-sobre-la-realidad-virtual-y-la-inteligencia-artificial.jpg", "https://www.ejemplo.com/etica-trabajo", 3, 1),
(1, "La regulación de la IA en Europa", 
"Un vistazo al marco regulatorio que la Unión Europea propone para la inteligencia artificial.", 
"https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", "https://www.ejemplo.com/regulacion-ue", 3, 1),
(1, "Sesgos en los algoritmos de inteligencia artificial", 
"Identificando y mitigando los sesgos en los modelos de IA.", 
"https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", "https://www.ejemplo.com/sesgos-ia", 3, 1),
(1, "Privacidad y seguridad en la era de la inteligencia artificial", 
"Cómo garantizar la privacidad en un mundo impulsado por la IA.", 
"https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", "https://www.ejemplo.com/privacidad-ia", 3, 1),
(1, "El debate sobre la autonomía de los sistemas de IA", 
"¿Hasta qué punto debemos permitir que los sistemas de inteligencia artificial tomen decisiones críticas?", 
"https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", "https://www.ejemplo.com/autonomia-ia", 3, 1);

INSERT INTO CONTENT (
  `position` ,
  paragraph ,
  img ,
  id_article 
) VALUES
-- Contenido para "Aspectos éticos de la inteligencia artificial en el trabajo"
(1, "Con la creciente automatización de tareas, surgen preocupaciones sobre el impacto de la inteligencia artificial en los empleos tradicionales.", "https://www.mercadosyfinanzas.com/wp-content/uploads/2024/02/las-preguntas-mas-frecuentes-sobre-la-realidad-virtual-y-la-inteligencia-artificial.jpg", 11),
(2, "Es esencial garantizar un equilibrio entre la eficiencia que aporta la IA y la protección de los derechos laborales, incluyendo la reubicación y capacitación de trabajadores.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 11),
(3, "Además, los marcos éticos deben abordar la responsabilidad de las empresas en la implementación de IA sin causar desigualdades laborales.", "https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", 11),

-- Contenido para "La regulación de la IA en Europa"
(1, "La Unión Europea está liderando el camino en la creación de un marco regulatorio que busca garantizar el uso ético y seguro de la inteligencia artificial.", "https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", 12),
(2, "El 'Reglamento de IA' propuesto incluye medidas para evaluar riesgos, garantizar la transparencia y proteger los derechos fundamentales.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 12),
(3, "Esta legislación podría establecer un estándar global para la regulación de tecnologías emergentes, inspirando a otras regiones del mundo.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 12),

-- Contenido para "Sesgos en los algoritmos de inteligencia artificial"
(1, "Los sesgos en los algoritmos de IA son un desafío significativo, ya que pueden perpetuar desigualdades existentes y afectar decisiones críticas.", "https://www.mercadosyfinanzas.com/wp-content/uploads/2024/02/las-preguntas-mas-frecuentes-sobre-la-realidad-virtual-y-la-inteligencia-artificial.jpg", 13),
(2, "Un enfoque para mitigarlos es garantizar la diversidad en los datos utilizados para entrenar los modelos, evitando representaciones desproporcionadas.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 13),
(3, "También es fundamental auditar regularmente los algoritmos y fomentar la colaboración entre especialistas en ética, tecnología y sociedad.", "https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", 13),

-- Contenido para "Privacidad y seguridad en la era de la inteligencia artificial"
(1, "El avance de la inteligencia artificial plantea nuevos desafíos en la protección de datos personales y la privacidad de los usuarios.", "https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", 14),
(2, "Las empresas deben adoptar medidas como la anonimización de datos y garantizar la transparencia en el uso de información sensible.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 14),
(3, "La colaboración entre gobiernos, empresas y organizaciones civiles es crucial para establecer estándares globales de seguridad en IA.", "https://www.mercadosyfinanzas.com/wp-content/uploads/2024/02/las-preguntas-mas-frecuentes-sobre-la-realidad-virtual-y-la-inteligencia-artificial.jpg", 14),

-- Contenido para "El debate sobre la autonomía de los sistemas de IA"
(1, "Los sistemas de inteligencia artificial autónomos están ganando protagonismo, planteando preguntas sobre el nivel de control humano necesario.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 15),
(2, "Permitir que la IA tome decisiones críticas, como en el ámbito médico o militar, requiere garantizar altos estándares de seguridad y ética.","https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", 15),
(3, "El debate sigue abierto, destacando la necesidad de un equilibrio entre innovación tecnológica y responsabilidad humana.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 15);

-- 4. Sección: Seguridad (id: 4)

INSERT INTO ARTICLE (id_user, title, summary, img, urlRecomend, id_section, id_status) VALUES
(1, "Cómo proteger los datos en aplicaciones de inteligencia artificial", 
"Las mejores prácticas para proteger datos sensibles en sistemas de IA.", 
"https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", "https://www.ejemplo.com/proteccion-datos-ia", 4, 1),
(1, "Ataques adversariales en modelos de aprendizaje profundo", 
"Cómo funcionan los ataques adversariales y cómo prevenirlos.", 
"https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", "https://www.ejemplo.com/ataques-adversariales", 4, 1),
(1, "IA y ciberseguridad: una combinación crucial", 
"El papel de la inteligencia artificial en la prevención de ciberataques.", 
"https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", "https://www.ejemplo.com/ia-ciberseguridad", 4, 1),
(1, "Riesgos de seguridad en sistemas autónomos", 
"Analizando las amenazas asociadas con los vehículos y robots autónomos.", 
"https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", "https://www.ejemplo.com/riesgos-autonomia", 4, 1),
(1, "La IA en la detección de fraudes financieros", 
"Cómo las empresas están usando la IA para detectar actividades fraudulentas.", 
"https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", "https://www.ejemplo.com/ia-deteccion-fraude", 4, 1);

INSERT INTO CONTENT (
  `position` ,
  paragraph ,
  img ,
  id_article 
) VALUES

-- Contenido para "Cómo proteger los datos en aplicaciones de inteligencia artificial"
(1, "La protección de datos en sistemas de inteligencia artificial requiere medidas avanzadas para garantizar la seguridad y privacidad de la información.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 16),
(2, "Las mejores prácticas incluyen el uso de cifrado, anonimización de datos y la implementación de protocolos de seguridad robustos.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 16),
(3, "Además, las auditorías regulares y el cumplimiento de normativas como el GDPR son esenciales para minimizar riesgos.", "https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", 16),

-- Contenido para "Ataques adversariales en modelos de aprendizaje profundo"
(1, "Los ataques adversariales explotan vulnerabilidades en modelos de aprendizaje profundo, alterando sus predicciones mediante entradas manipuladas.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 17),
(2, "Prevenir estos ataques requiere técnicas como el entrenamiento adversarial, detección de anomalías y modelos más resistentes.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 17),
(3, "La investigación en este campo está creciendo rápidamente, ofreciendo soluciones innovadoras para proteger sistemas basados en IA.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 17),

-- Contenido para "IA y ciberseguridad: una combinación crucial"
(1, "La inteligencia artificial se ha convertido en una herramienta clave en la lucha contra el cibercrimen, detectando amenazas en tiempo real.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 18),
(2, "Los sistemas de IA pueden analizar grandes volúmenes de datos para identificar patrones de ataques y prevenir intrusiones.", "https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", 18),
(3, "Sin embargo, también es necesario proteger estos sistemas para evitar que sean objetivos de los ciberatacantes.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 18),

-- Contenido para "Riesgos de seguridad en sistemas autónomos"
(1, "Los sistemas autónomos, como los vehículos y robots, presentan riesgos de seguridad que pueden ser explotados por actores maliciosos.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 19),
(2, "Las amenazas incluyen el acceso no autorizado a sistemas de control y la manipulación de datos críticos para su funcionamiento.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 19),
(3, "La implementación de medidas de ciberseguridad específicas es vital para garantizar la operación segura de estos sistemas.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 19),

-- Contenido para "La IA en la detección de fraudes financieros"
(1, "Las empresas están utilizando inteligencia artificial para detectar patrones irregulares en transacciones financieras y prevenir fraudes.", "https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", 20),
(2, "Los algoritmos de aprendizaje automático analizan datos en tiempo real, identificando comportamientos sospechosos con gran precisión.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 20),
(3, "Además, la IA permite adaptar las estrategias de detección a nuevas tácticas de fraude, mejorando la respuesta ante amenazas emergentes.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 20);

-- 7. Sección: Innovación (id: 7)

INSERT INTO ARTICLE (id_user, title, summary, img, urlRecomend, id_section, id_status) VALUES
(1, "La inteligencia artificial en la exploración espacial", 
"Nuevos avances en IA están permitiendo una mejor exploración del universo.", 
"https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", "https://www.ejemplo.com/ia-espacio", 7, 1),
(1, "Creando ciudades inteligentes con IA", 
"Cómo la inteligencia artificial está transformando las ciudades en entornos más sostenibles y eficientes.", 
"https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", "https://www.ejemplo.com/ciudades-inteligentes", 7, 1),
(1, "IA en el desarrollo de nuevos materiales", 
"El papel de la inteligencia artificial en la creación de materiales innovadores.", 
"https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", "https://www.ejemplo.com/nuevos-materiales", 7, 1),
(1, "Los sistemas autónomos en la agricultura moderna", 
"Cómo la IA está revolucionando la producción de alimentos a través de la automatización.", 
"https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", "https://www.ejemplo.com/agricultura-ia", 7, 1),
(1, "Prototipos revolucionarios creados con IA", 
"Los inventos más impactantes creados gracias a la inteligencia artificial.", 
"https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", "https://www.ejemplo.com/prototipos-ia", 7, 1);

INSERT INTO CONTENT (
  `position` ,
  paragraph ,
  img ,
  id_article 
) VALUES
-- Contenido para "La inteligencia artificial en la exploración espacial"
(1, "La inteligencia artificial está revolucionando la exploración espacial al analizar datos de satélites y telescopios con mayor rapidez y precisión.", "https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", 21),
(2, "Gracias a los avances en machine learning, se han detectado exoplanetas y patrones estelares previamente desconocidos.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 21),
(3, "La IA también juega un papel crucial en la planificación de misiones autónomas a Marte y otros cuerpos celestes.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 21),

-- Contenido para "Creando ciudades inteligentes con IA"
(1, "Las ciudades inteligentes aprovechan la inteligencia artificial para optimizar el uso de recursos, como energía y agua.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 22),
(2, "Sistemas de IA gestionan el tráfico urbano, reduciendo congestiones y mejorando la calidad del aire.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 22),
(3, "Además, las aplicaciones de IA están ayudando a diseñar espacios urbanos más inclusivos y sostenibles.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 22),

-- Contenido para "IA en el desarrollo de nuevos materiales"
(1, "El uso de inteligencia artificial en la ciencia de materiales ha acelerado el descubrimiento de compuestos con propiedades únicas.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 23),
(2, "Modelos predictivos basados en IA pueden simular el comportamiento de nuevos materiales antes de su fabricación.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 23),
(3, "Estas innovaciones están transformando industrias como la aeroespacial, la automotriz y la construcción.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 23),

-- Contenido para "Los sistemas autónomos en la agricultura moderna"
(1, "En la agricultura, los sistemas autónomos impulsados por IA están optimizando la siembra, el riego y la cosecha.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 24),
(2, "Los drones equipados con inteligencia artificial monitorean cultivos y detectan problemas de manera temprana.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 24),
(3, "Esto no solo mejora la productividad, sino que también reduce el impacto ambiental de las prácticas agrícolas.", "https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", 24),

-- Contenido para "Prototipos revolucionarios creados con IA"
(1, "La inteligencia artificial está permitiendo la creación de prototipos innovadores en áreas como la salud, la robótica y el transporte.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 25),
(2, "Ejemplos destacados incluyen prótesis inteligentes, vehículos autónomos y robots colaborativos.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 25),
(3, "Estos avances están redefiniendo lo que es posible en el diseño y desarrollo tecnológico.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 25);

-- 8. Sección: Educación (id: 8)

INSERT INTO ARTICLE (id_user, title, summary, img, urlRecomend, id_section, id_status) VALUES
(1,"IA en la personalización del aprendizaje", "Cómo la inteligencia artificial adapta los contenidos educativos a las necesidades de cada estudiante.", 
"https://static.wixstatic.com/media/nsplsh_0fe3871151c240d3bf178a4fbbc6699d~mv2.jpg/v1/fill/w_568,h_376,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/nsplsh_0fe3871151c240d3bf178a4fbbc6699d~mv2.jpg", 
"https://www.ejemplo.com/ia-aprendizaje", 8, 1),
(1, "Plataformas educativas impulsadas por inteligencia artificial", "Conoce las herramientas que están revolucionando la educación online.", 
"https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", "https://www.ejemplo.com/ia-plataformas", 8, 1),
(1, "Evaluaciones automatizadas mediante IA", "El uso de algoritmos para calificar exámenes y trabajos de manera precisa y eficiente.",
"https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", "https://www.ejemplo.com/ia-evaluaciones", 8, 1),
(1, "Tutorías virtuales basadas en IA", "El impacto de los tutores virtuales en el aprendizaje de idiomas y habilidades técnicas.", 
"https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", "https://www.ejemplo.com/ia-tutorias", 8, 1),
(1, "Desafíos éticos de la IA en la educación", "Reflexiones sobre la privacidad de los estudiantes y el uso de sus datos en sistemas educativos.", 
"https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", "https://www.ejemplo.com/ia-educacion-etica", 8, 1);


INSERT INTO CONTENT (
  `position` ,
  paragraph ,
  img ,
  id_article 
) VALUES
-- Contenido para "IA en la personalización del aprendizaje"
(1, "La inteligencia artificial permite crear experiencias educativas personalizadas al analizar el progreso y las necesidades de cada estudiante.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 26),
(2, "Con algoritmos adaptativos, los estudiantes reciben contenido y ejercicios específicos para superar sus dificultades.", "https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", 26),
(3, "Esto fomenta un aprendizaje más eficiente y aumenta la motivación al ver resultados inmediatos.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 26),

-- Contenido para "Plataformas educativas impulsadas por inteligencia artificial"
(1, "Plataformas como Khan Academy y Coursera utilizan IA para ofrecer recomendaciones personalizadas y experiencias de aprendizaje inmersivas.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 27),
(2, "Estas herramientas permiten a los estudiantes aprender a su propio ritmo, optimizando el tiempo y los recursos.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 27),
(3, "La inteligencia artificial también facilita el acceso a contenidos educativos de alta calidad en áreas remotas.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png",
27),

-- Contenido para "Evaluaciones automatizadas mediante IA"
(1, "Los sistemas de inteligencia artificial están revolucionando la evaluación educativa al calificar automáticamente exámenes y trabajos.", "https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", 28),
(2, "Esto garantiza mayor objetividad y reduce el tiempo que los profesores dedican a tareas repetitivas.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 28),
(3, "Además, estos sistemas pueden identificar patrones en los errores comunes y ofrecer retroalimentación personalizada.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 28),

-- Contenido para "Tutorías virtuales basadas en IA"
(1, "Los tutores virtuales impulsados por inteligencia artificial ayudan a los estudiantes a aprender idiomas y habilidades técnicas de manera interactiva.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 29),
(2, "Estos tutores ofrecen explicaciones detalladas, ejemplos prácticos y simulaciones adaptadas al nivel del estudiante.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 29),
(3, "Con la disponibilidad 24/7, los estudiantes pueden acceder a apoyo educativo en cualquier momento y lugar.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 29),

-- Contenido para "Desafíos éticos de la IA en la educación"
(1, "El uso de inteligencia artificial en la educación plantea importantes preguntas sobre la privacidad de los datos de los estudiantes.", "https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", 30),
(2, "Es fundamental garantizar que los sistemas educativos protegidos por IA cumplan con normas éticas y legales.", "https://www.mercadosyfinanzas.com/wp-content/uploads/2024/02/las-preguntas-mas-frecuentes-sobre-la-realidad-virtual-y-la-inteligencia-artificial.jpg", 30),
(3, "Los desarrolladores y educadores deben trabajar juntos para mitigar los riesgos y garantizar un uso responsable de la tecnología.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 30);

-- 10. Sección: Robótica (id: 10)

INSERT INTO ARTICLE (id_user, title, summary, img, urlRecomend, id_section, id_status) VALUES
(1, "Avances en robots humanoides impulsados por IA", 
"Los últimos desarrollos en robots con habilidades humanas avanzadas.", 
"https://www.mercadosyfinanzas.com/wp-content/uploads/2024/02/las-preguntas-mas-frecuentes-sobre-la-realidad-virtual-y-la-inteligencia-artificial.jpg", "https://www.ejemplo.com/ia-humanoides", 10, 1),
(1, "IA en la navegación autónoma de robots", 
"Cómo los algoritmos de IA están permitiendo a los robots moverse sin supervisión.", 
"https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", "https://www.ejemplo.com/navegacion-autonoma", 10, 1),
(1, "Robots colaborativos en la industria", 
"El impacto de los 'cobots' en la productividad de las fábricas.", 
"https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", "https://www.ejemplo.com/cobots-industria", 10, 1),
(1, "Sistemas de visión por computadora en robótica", 
"Cómo los robots utilizan visión artificial para interactuar con su entorno.", 
"https://binduevents.com/wp-content/uploads/2024/06/Inteligencia-artificial-eventos-3.jpg", "https://www.ejemplo.com/vision-robotica", 10, 1),
(1, "El futuro de la robótica en el hogar", 
"Dispositivos inteligentes que simplifican las tareas domésticas.", 
"https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", "https://www.ejemplo.com/robotica-hogar", 10, 1);

INSERT INTO CONTENT (
  `position` ,
  paragraph ,
  img ,
  id_article 
) VALUES
-- Contenido para "Avances en robots humanoides impulsados por IA"
(1, "Los robots humanoides han avanzado significativamente, integrando capacidades de reconocimiento facial, lenguaje natural y movimientos más precisos.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 31),
(2, "Estos robots se están utilizando en sectores como la atención al cliente y la salud, ofreciendo interacciones más humanas.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 31),
(3, "Con la IA, los robots humanoides están aprendiendo a adaptarse a diferentes contextos y mejorar sus habilidades con el tiempo.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 31),

-- Contenido para "IA en la navegación autónoma de robots"
(1, "Gracias a la inteligencia artificial, los robots pueden analizar su entorno y planificar rutas de manera eficiente.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 32),
(2, "Esto ha permitido el desarrollo de vehículos autónomos y drones capaces de operar sin intervención humana.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 32),
(3, "Los avances en algoritmos de navegación están mejorando la precisión y la seguridad en aplicaciones robóticas.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 32),

-- Contenido para "Robots colaborativos en la industria"
(1, "Los robots colaborativos, también conocidos como 'cobots', están diseñados para trabajar junto a los humanos en entornos industriales.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 33),
(2, "Estos dispositivos aumentan la productividad al realizar tareas repetitivas mientras los humanos se centran en actividades más complejas.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 33),
(3, "Gracias a la IA, los cobots son capaces de adaptarse a nuevos procesos y garantizar la seguridad en la interacción humano-robot.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 33),

-- Contenido para "Sistemas de visión por computadora en robótica"
(1, "La visión por computadora permite a los robots identificar objetos, medir distancias y comprender su entorno.", "https://www.mercadosyfinanzas.com/wp-content/uploads/2024/02/las-preguntas-mas-frecuentes-sobre-la-realidad-virtual-y-la-inteligencia-artificial.jpg", 34),
(2, "Esta tecnología es fundamental en aplicaciones como la inspección de calidad, ensamblaje automatizado y agricultura de precisión.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 34),
(3, "Con avances en aprendizaje profundo, los robots pueden interpretar imágenes en tiempo real y tomar decisiones más inteligentes.", "https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", 34),

-- Contenido para "El futuro de la robótica en el hogar"
(1, "Los robots domésticos están evolucionando para realizar tareas como limpieza, cocina y vigilancia del hogar.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 35),
(2, "Estos dispositivos inteligentes pueden aprender hábitos de los usuarios y ofrecer soluciones personalizadas.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 35),
(3, "Con IA, los robots del hogar están cada vez más integrados en la vida cotidiana, facilitando un estilo de vida más cómodo y eficiente.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 35);

-- 12. Sección: Entrevistas y Opinión (id: 12)

INSERT INTO ARTICLE (id_user, title, summary, img, urlRecomend, id_section, id_status) VALUES
(1, "Entrevista con un pionero de la IA", 
"Perspectivas de un líder en inteligencia artificial sobre el futuro de la tecnología.", 
"https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", "https://www.ejemplo.com/entrevista-pionero", 12, 1),
(1, "¿La IA reemplazará el trabajo humano? Opiniones encontradas", 
"Expertos debaten el impacto de la inteligencia artificial en el empleo global.", 
"https://www.mercadosyfinanzas.com/wp-content/uploads/2024/02/las-preguntas-mas-frecuentes-sobre-la-realidad-virtual-y-la-inteligencia-artificial.jpg", "https://www.ejemplo.com/opinion-ia-trabajo", 12, 1),
(1, "El dilema ético de la IA según académicos", 
"Exploramos las preocupaciones éticas que rodean a la inteligencia artificial.", 
"https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", "https://www.ejemplo.com/etica-academicos", 12, 1),
(1, "Predicciones sobre la IA en los próximos 10 años", 
"Futuristas comparten sus predicciones sobre la evolución de la inteligencia artificial.", 
"https://binduevents.com/wp-content/uploads/2024/06/Inteligencia-artificial-eventos-3.jpg", "https://www.ejemplo.com/predicciones-ia", 12, 1),
(1, "El impacto de la IA en la creatividad: una entrevista con artistas digitales", 
"Artistas exploran cómo las herramientas de IA están transformando su trabajo.", 
"https://binduevents.com/wp-content/uploads/2024/06/Inteligencia-artificial-eventos-3.jpg", "https://www.ejemplo.com/ia-creatividad", 12, 1);

INSERT INTO CONTENT (
  `position` ,
  paragraph ,
  img ,
  id_article 
) VALUES
-- Contenido para "Entrevista con un pionero de la IA"
(1, "En esta entrevista exclusiva, un pionero de la inteligencia artificial comparte su visión sobre cómo la IA transformará todas las industrias en la próxima década.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 36),
(2, "El líder de la IA enfatiza la importancia de la ética y la transparencia en el desarrollo de esta tecnología, subrayando que debe estar al servicio de la humanidad.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 36),
(3, "Con un enfoque en la educación y la colaboración global, se exploran las iniciativas para garantizar un futuro con IA accesible para todos.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 36),

-- Contenido para "¿La IA reemplazará el trabajo humano? Opiniones encontradas"
(1, "El debate sobre el impacto de la IA en el empleo es complejo y polarizado, con algunos expertos prediciendo una disrupción masiva y otros anticipando una complementación entre humanos y máquinas.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 37),
(2, "El análisis de la situación laboral actual revela que la automatización está cambiando los roles, pero la necesidad de habilidades humanas únicas sigue siendo clave.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 37),
(3, "Se discuten posibles soluciones como la reconversión profesional y el desarrollo de nuevas formas de colaboración entre humanos e IA para mitigar los impactos negativos en el empleo.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 37),

-- Contenido para "El dilema ético de la IA según académicos"
(1, "La ética en la inteligencia artificial es uno de los temas más debatidos por académicos y profesionales de la tecnología. La preocupación se centra en el uso responsable de la IA y sus implicaciones a largo plazo.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 38),
(2, "Desde la privacidad hasta los prejuicios en los algoritmos, los académicos exploran los dilemas éticos que podrían surgir con el desarrollo de sistemas de IA autónomos.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 38),
(3, "El consenso general es que se debe establecer un marco legal y ético sólido para garantizar que la IA beneficie a la sociedad sin poner en riesgo derechos fundamentales.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 38),

-- Contenido para "Predicciones sobre la IA en los próximos 10 años"
(1, "Futuristas y expertos en IA predicen una década de avances espectaculares que incluirán robots más inteligentes, IA integradas en todas las áreas de la vida cotidiana, y avances en la automatización de procesos complejos.", "https://www.mercadosyfinanzas.com/wp-content/uploads/2024/02/las-preguntas-mas-frecuentes-sobre-la-realidad-virtual-y-la-inteligencia-artificial.jpg", 39),
(2, "Entre las predicciones más destacadas se encuentran el desarrollo de IA capaces de realizar tareas creativas y el impacto de la IA en la sostenibilidad global.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 39),
(3, "Se prevé que en los próximos diez años, la IA transforme la forma en que trabajamos, aprendemos y nos relacionamos con la tecnología, pero también que surjan nuevos retos éticos y sociales.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 39),

-- Contenido para "El impacto de la IA en la creatividad: una entrevista con artistas digitales"
(1, "Artistas digitales comparten su experiencia utilizando IA como herramienta creativa, discutiendo cómo estas tecnologías están ampliando las fronteras de la creatividad.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 40),
(2, "La IA ha permitido a los artistas crear obras de arte de manera colaborativa con las máquinas, generando nuevos estilos y formas de expresión.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 40),
(3, "Sin embargo, también surgen preocupaciones sobre la originalidad y el papel de la máquina en la creación artística, un debate que sigue vigente entre los creadores y los críticos del arte.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 40);

-- 13. Sección: Proyectos y Tutoriales (id: 13)

INSERT INTO ARTICLE (id_user, title, summary, img, urlRecomend, id_section, id_status) VALUES
(1, "Cómo crear un chatbot con Python y TensorFlow", 
"Un tutorial paso a paso para desarrollar un chatbot inteligente.", 
"https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", "https://www.ejemplo.com/tutorial-chatbot", 13, 1),
(1, "Desarrollando un modelo de reconocimiento facial", 
"Aprende a implementar un sistema de reconocimiento facial usando OpenCV.", 
"https://www.mercadosyfinanzas.com/wp-content/uploads/2024/02/las-preguntas-mas-frecuentes-sobre-la-realidad-virtual-y-la-inteligencia-artificial.jpg", "https://www.ejemplo.com/reconocimiento-facial", 13, 1),
(1, "Automatiza tus tareas con IA en Google Sheets", 
"Un proyecto práctico para integrar inteligencia artificial en hojas de cálculo.", 
"https://revistacongresos.com/wp-content/uploads/2024/02/IA-700x400-px.png", "https://www.ejemplo.com/ia-google-sheets", 13, 1),
(1, "Introducción a redes neuronales con Keras", 
"Un tutorial básico para construir tu primera red neuronal.", 
"https://binduevents.com/wp-content/uploads/2024/06/Inteligencia-artificial-eventos-3.jpg", "https://www.ejemplo.com/keras-basico", 13, 1),
(1, "Cómo entrenar un modelo de machine learning en AWS", 
"Configura y entrena un modelo en Amazon Web Services con facilidad.", 
"https://controlpublicidad.com/wp-content/uploads/2024/05/aplicacion-de-la-inteligencia-artificial-en-la-industria-de-los-eventos-081522.jpg", "https://www.ejemplo.com/aws-machine-learning", 13, 1);

INSERT INTO CONTENT (
  `position` ,
  paragraph ,
  img ,
  id_article 
) VALUES
-- Contenido para "Cómo crear un chatbot con Python y TensorFlow"
(1, "Este tutorial te guiará a través de los pasos necesarios para construir un chatbot inteligente utilizando Python y la biblioteca TensorFlow, una de las más populares para el desarrollo de modelos de IA.",
"https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 41),
(2, "Aprenderás cómo preprocesar los datos, entrenar un modelo de lenguaje y poner en marcha un chatbot que pueda interactuar de manera natural con los usuarios.",
"https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 41),
(3, "Con este proyecto, comprenderás los conceptos fundamentales detrás de los chatbots y cómo la IA puede ser aplicada en aplicaciones del mundo real para mejorar la interacción con los usuarios.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 41),

-- Contenido para "Desarrollando un modelo de reconocimiento facial"
(1, "En este artículo, aprenderás a implementar un sistema de reconocimiento facial utilizando OpenCV, una poderosa librería para procesamiento de imágenes en tiempo real.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 42),
(2, "Te guiaremos en el proceso de capturar imágenes, entrenar un modelo para detectar rostros y realizar el reconocimiento de personas a partir de imágenes o videos.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 42),
(3, "Este proyecto práctico no solo te ayudará a entender cómo funcionan los sistemas de visión por computadora, sino que también te dará las bases para crear aplicaciones de seguridad o reconocimiento facial en diversos escenarios.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 42),

-- Contenido para "Automatiza tus tareas con IA en Google Sheets"
(1, "¿Sabías que puedes integrar inteligencia artificial en Google Sheets? En este tutorial aprenderás cómo automatizar tareas repetitivas y análisis de datos utilizando IA directamente desde tus hojas de cálculo.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 43),
(2,
"Te enseñaremos cómo crear scripts en Google Apps Script y cómo integrar modelos de IA para hacer predicciones o realizar análisis de texto, todo desde la comodidad de Google Sheets.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 43),
(3, "Con este enfoque, podrás optimizar tus flujos de trabajo y mejorar la eficiencia en tareas diarias como el análisis de datos y la toma de decisiones basada en inteligencia artificial.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 43),

-- Contenido para "Introducción a redes neuronales con Keras"
(1, "En este tutorial básico, aprenderás a construir tu primera red neuronal utilizando Keras, una de las bibliotecas más fáciles de usar para trabajar con redes neuronales en Python.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 44),
(2, "Comenzarás desde los fundamentos, creando un modelo sencillo, y aprenderás a entrenarlo con un conjunto de datos. Además, veremos cómo ajustar los hiperparámetros para mejorar la precisión del modelo.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 44),
(3, "Al final de este tutorial, tendrás los conocimientos básicos para construir redes neuronales y aplicarlas a problemas de clasificación de imágenes, predicción y más.", "https://reedmackay.com/wp-content/uploads/2024/06/AI-in-events-2.png", 44),

-- Contenido para "Cómo entrenar un modelo de machine learning en AWS"
(1, "En este artículo aprenderás a configurar y entrenar un modelo de machine learning en Amazon Web Services (AWS) utilizando su plataforma de entrenamiento en la nube.", "https://www.mercadosyfinanzas.com/wp-content/uploads/2024/02/las-preguntas-mas-frecuentes-sobre-la-realidad-virtual-y-la-inteligencia-artificial.jpg", 45),
(2, "Te enseñaremos cómo crear un entorno en AWS, cargar tus datos y utilizar herramientas como SageMaker para entrenar modelos con facilidad, sin necesidad de infraestructura propia.", "https://agdb.mx/wp-content/uploads/2024/02/image-1024x585.png", 45),
(3, "Al final, sabrás cómo aprovechar la potencia de la nube para entrenar modelos de machine learning de manera más eficiente y escalable, optimizando el tiempo y los recursos de tu proyecto.", "https://blog.meetmaps.com/wp-content/uploads/2023/12/futuro-robot-inteligencia-artificial-fondo-sistema-red.jpg", 45);

-- 14. Sección: Eventos y Conferencias (id: 14)

INSERT INTO ARTICLE (id_user, title, summary, img, urlRecomend, id_section, id_status) VALUES
(1, "Conferencia sobre IA y ética en 2024", 
"Detalles del próximo evento global que abordará los desafíos éticos de la inteligencia artificial.", 
"https://imagenes.eltiempo.com/files/image_1200_600/uploads/2024/01/17/65a7f1f13f08d.png", "https://www.ejemplo.com/conferencia-etica", 14, 1),
(1, "Los mejores eventos de IA en Europa este año", 
"Un resumen de los congresos y conferencias más importantes sobre inteligencia artificial en Europa.", 
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpwY-iNa5lT2qh3UHjHCdfJ-Upqa-YIYtj1Tj4z7UO_1E1LJ8aMVTUbtyk4wBVPZFexYw&usqp=CAU", "https://www.ejemplo.com/eventos-europa", 14, 1),
(1, "Hackathon de inteligencia artificial para principiantes", 
"Participa en un evento diseñado para aprender y competir en proyectos de IA.", 
"https://artificialpaintings.com/wp-content/uploads/2024/06/391_AI_events_to_attend_in_2024.webp", "https://www.ejemplo.com/hackathon-ia", 14, 1),
(1, "Feria de innovación en IA 2024", 
"Explora las tecnologías más avanzadas presentadas en esta feria internacional.", 
"https://imagenes.eltiempo.com/files/image_1200_600/uploads/2024/01/17/65a7f1f13f08d.png", "https://www.ejemplo.com/feria-innovacion", 14, 1),
(1, "Cumbre global sobre inteligencia artificial", 
"Expertos de todo el mundo discuten el futuro de la IA en esta cumbre.", 
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpwY-iNa5lT2qh3UHjHCdfJ-Upqa-YIYtj1Tj4z7UO_1E1LJ8aMVTUbtyk4wBVPZFexYw&usqp=CAU", "https://www.ejemplo.com/cumbre-global", 14, 1);

INSERT INTO CONTENT (
  `position` ,
  paragraph ,
  img ,
  id_article 
) VALUES
-- Contenido para "Conferencia sobre IA y ética en 2024"
(1, "En este artículo, te brindamos los detalles de la próxima conferencia global sobre la inteligencia artificial, donde expertos de todo el mundo debatirán sobre los desafíos éticos que enfrenta la IA.", "https://www.themarkethink.com/wp-content/uploads/2018/12/ia_sophia.jpg", 46),
(2, "Este evento será una plataforma para discutir temas cruciales como la privacidad, los sesgos algorítmicos y la transparencia en los sistemas de IA, con la participación de líderes de la industria y académicos.", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpwY-iNa5lT2qh3UHjHCdfJ-Upqa-YIYtj1Tj4z7UO_1E1LJ8aMVTUbtyk4wBVPZFexYw&usqp=CAU", 46),
(3, "Será una oportunidad única para estar al tanto de las últimas tendencias y descubrir cómo la comunidad está abordando las implicaciones éticas de las tecnologías emergentes.", "https://imagenes.eltiempo.com/files/image_1200_600/uploads/2024/01/17/65a7f1f13f08d.png", 46),

-- Contenido para "Los mejores eventos de IA en Europa este año"
(1, "En este artículo, te presentamos un resumen de los congresos y conferencias más importantes sobre inteligencia artificial que se celebrarán en Europa este año.", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpwY-iNa5lT2qh3UHjHCdfJ-Upqa-YIYtj1Tj4z7UO_1E1LJ8aMVTUbtyk4wBVPZFexYw&usqp=CAU", 47),
(2, "Desde eventos académicos hasta encuentros de startups, estos congresos cubrirán una amplia gama de temas como machine learning, ética en IA y aplicaciones de la IA en diversas industrias.", "https://www.themarkethink.com/wp-content/uploads/2018/12/ia_sophia.jpg", 47),
(3, "Si eres un profesional o estudiante interesado en el futuro de la IA, estos eventos te ofrecen una excelente oportunidad para ampliar tus conocimientos y establecer contactos en la industria.", "https://imagenes.eltiempo.com/files/image_1200_600/uploads/2024/01/17/65a7f1f13f08d.png", 47),

-- Contenido para "Hackathon de inteligencia artificial para principiantes"
(1, "En este artículo te invitamos a participar en un hackathon de inteligencia artificial diseñado especialmente para principiantes.", "https://www.themarkethink.com/wp-content/uploads/2018/12/ia_sophia.jpg", 48),
(2, "El evento está enfocado en aprender y competir en proyectos de IA, brindando una excelente oportunidad para mejorar tus habilidades prácticas, independientemente de tu nivel de experiencia.", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpwY-iNa5lT2qh3UHjHCdfJ-Upqa-YIYtj1Tj4z7UO_1E1LJ8aMVTUbtyk4wBVPZFexYw&usqp=CAU", 48),
(3, "Durante el hackathon, tendrás acceso a recursos educativos, mentoría y la posibilidad de trabajar en proyectos reales que pueden tener un impacto significativo en la comunidad.", "https://imagenes.eltiempo.com/files/image_1200_600/uploads/2024/01/17/65a7f1f13f08d.png", 48),

-- Contenido para "Feria de innovación en IA 2024"
(1, "En este artículo te contamos todo sobre la Feria de Innovación en IA 2024, un evento internacional donde se presentarán las tecnologías más avanzadas en inteligencia artificial.", "https://imagenes.eltiempo.com/files/image_1200_600/uploads/2024/01/17/65a7f1f13f08d.png", 49),
(2, "La feria reunirá a las empresas y startups más innovadoras, ofreciendo una oportunidad para explorar nuevas herramientas, productos y soluciones basadas en IA, con demostraciones en vivo y charlas de expertos.", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpwY-iNa5lT2qh3UHjHCdfJ-Upqa-YIYtj1Tj4z7UO_1E1LJ8aMVTUbtyk4wBVPZFexYw&usqp=CAU", 49),
(3, "Es una excelente ocasión para ver de primera mano las tendencias emergentes y descubrir cómo la inteligencia artificial está moldeando el futuro de diversas industrias, desde la salud hasta la automoción.", "https://www.themarkethink.com/wp-content/uploads/2018/12/ia_sophia.jpg", 49),

-- Contenido para "Cumbre global sobre inteligencia artificial"
(1, "La Cumbre Global sobre Inteligencia Artificial es uno de los eventos más esperados de 2024, donde los principales expertos de la IA discutirán el futuro de la tecnología y sus implicaciones en la sociedad.", "https://www.themarkethink.com/wp-content/uploads/2018/12/ia_sophia.jpg", 50),
(2, "Durante la cumbre, se tocarán temas como el impacto social de la IA, la automatización, las políticas públicas, la ética y la colaboración internacional en el avance de la inteligencia artificial.", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpwY-iNa5lT2qh3UHjHCdfJ-Upqa-YIYtj1Tj4z7UO_1E1LJ8aMVTUbtyk4wBVPZFexYw&usqp=CAU", 50),
(3, "Será un espacio de debate crucial para comprender cómo los gobiernos, las empresas y la academia están trabajando juntos para dar forma a la evolución de la inteligencia artificial en las próximas décadas.", "https://imagenes.eltiempo.com/files/image_1200_600/uploads/2024/01/17/65a7f1f13f08d.png", 50),
(4, "La feria reunirá a las empresas y startups más innovadoras, ofreciendo una oportunidad para explorar nuevas herramientas, productos y soluciones basadas en IA, con demostraciones en vivo y charlas de expertos.", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpwY-iNa5lT2qh3UHjHCdfJ-Upqa-YIYtj1Tj4z7UO_1E1LJ8aMVTUbtyk4wBVPZFexYw&usqp=CAU", 50);


/* SELECTS */

SELECT
  a.id,
  a.title,
  a.summary,
  a.img,
  a.createdDate,
  a.updateDate,
  a.urlRecomend,
  a.id_status,
  a.id_section,
  CONCAT(p.name, " ", p.lastname, " ", p.surname) author,
  st.name status,
  se.name section,
  (
    SELECT
      JSON_ARRAYAGG(JSON_OBJECT(
        'position', c.position,
        'paragraph', c.paragraph,
        'img', c.img
      ))
    FROM
      CONTENT c 
    WHERE
      c.id_article = a.id
    ORDER BY
      c.position
  ) content
FROM
  ARTICLE a
INNER JOIN
  USER u
ON
  u.id = a.id_user
INNER JOIN
  PERSON p 
ON
  p.id = u.id_person 
INNER JOIN
  STATUS st
ON
  st.id = a.id_status
INNER JOIN
  SECTION se
ON
  se.id = a.id_section;

UPDATE ARTICLE SET img = "https://controlpublicidad.com/wp-content/uploads/2024/05/inteligencia-artificial-e-imaginacion-102327.jpg" where id<900;