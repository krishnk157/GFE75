export default function mergeData(sessions) {
  const merged = new Map();

  for (const { user, duration, equipment } of sessions) {
    if (!merged.has(user)) {
      merged.set(user, {
        user,
        duration: 0,
        equipment: new Set(),
      });
    }

    const entry = merged.get(user);
    entry.duration += duration;
    equipment.forEach((eq) => entry.equipment.add(eq));
  }

  return [...merged.values()].map((entry) => ({
    user: entry.user,
    duration: entry.duration,
    equipment: [...entry.equipment].sort(),
  }));
}
