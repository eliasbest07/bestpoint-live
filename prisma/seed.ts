import { PrismaClient, PostType } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const maria = await prisma.user.upsert({
    where: { email: "maria@bestpoint.live" },
    update: {},
    create: { email: "maria@bestpoint.live", name: "María C.", level: 4, levelName: "Creadora", performance: 10, coins: 2480, streak: 7 },
  });
  const lucas = await prisma.user.upsert({ where: { email: "lucas@bestpoint.live" }, update: {}, create: { email: "lucas@bestpoint.live", name: "Lucas R.", coins: 300 } });
  const sofi  = await prisma.user.upsert({ where: { email: "sofi@bestpoint.live"  }, update: {}, create: { email: "sofi@bestpoint.live",  name: "Sofía M.", coins: 450 } });
  const diego = await prisma.user.upsert({ where: { email: "diego@bestpoint.live" }, update: {}, create: { email: "diego@bestpoint.live", name: "Diego T.", coins: 180 } });

  const club = await prisma.club.upsert({
    where: { slug: "bestpoint" }, update: {},
    create: { name: "Bestpoint", slug: "bestpoint", description: "El club central." },
  });
  for (const u of [maria, lucas, sofi, diego]) {
    await prisma.clubMember.upsert({ where: { userId_clubId: { userId: u.id, clubId: club.id } }, update: {}, create: { userId: u.id, clubId: club.id } });
  }

  // posts
  await prisma.post.createMany({
    data: [
      { authorId: lucas.id, clubId: club.id, type: PostType.IMAGE, title: "Arrancamos el jueves de taller", body: "Primer encuentro del club de escritura creativa.", tag: "Taller", tagColor: "#FFC83A", hue: 25 },
      { authorId: sofi.id,  clubId: club.id, type: PostType.VIDEO, title: "Demo rápida del nuevo agenda", body: "Video corto explicando cómo organizar reuniones.", tag: "Tutorial", tagColor: "#9FD9F7", hue: 180 },
      { authorId: maria.id, clubId: club.id, type: PostType.TEXT,  title: "Tip del día", body: "Bloques de 25' + descanso 5'. Después de 4, pausa larga.", tag: "Idea", tagColor: "#2FD576", hue: 90 },
    ],
  });
  const pollPost = await prisma.post.create({
    data: { authorId: diego.id, clubId: club.id, type: PostType.POLL, title: "¿Qué tema para la próxima reunión?", body: "Voten, cerramos mañana.", tag: "Encuesta", tagColor: "#FFB5C2", hue: 320 },
  });
  await prisma.poll.create({
    data: { postId: pollPost.id, options: { create: [{ label: "Finanzas personales" }, { label: "Creatividad en equipo" }, { label: "Hábitos de lectura" }] } },
  });

  // meeting
  const in2Days = new Date(); in2Days.setDate(in2Days.getDate() + 2); in2Days.setHours(19, 0, 0, 0);
  const meeting = await prisma.meeting.create({
    data: {
      creatorId: lucas.id, clubId: club.id,
      title: "Taller abierto: escritura creativa",
      description: "Vengan con un cuaderno y ganas de compartir.",
      startsAt: in2Days, durationMin: 90, location: "Sede Bestpoint",
    },
  });
  for (const u of [maria, lucas, sofi, diego]) {
    await prisma.meetingAttendee.upsert({
      where: { meetingId_userId: { meetingId: meeting.id, userId: u.id } },
      update: {}, create: { meetingId: meeting.id, userId: u.id, status: "GOING" },
    });
  }

  // agendas
  const a1 = await prisma.agenda.create({ data: { ownerId: diego.id, clubId: club.id, title: "Lectura de abril", description: "Plan mensual de lectura" } });
  await prisma.agendaItem.createMany({ data: [
    { agendaId: a1.id, order: 0, title: "Elegir libros", done: true },
    { agendaId: a1.id, order: 1, title: "Leer capítulo 1-3", done: true },
    { agendaId: a1.id, order: 2, title: "Reunión de debate", done: false },
    { agendaId: a1.id, order: 3, title: "Reseñas finales", done: false },
  ]});
  const a2 = await prisma.agenda.create({ data: { ownerId: sofi.id, clubId: club.id, title: "Sprint de contenido" } });
  await prisma.agendaItem.createMany({ data: [
    { agendaId: a2.id, order: 0, title: "Brief", done: true },
    { agendaId: a2.id, order: 1, title: "Producción", done: false },
    { agendaId: a2.id, order: 2, title: "Review", done: false },
  ]});

  console.log("✓ seed ok");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
