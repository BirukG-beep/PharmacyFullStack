export const glowPlugin = {
  id: "glowPlugin",
  beforeDraw: (chart) => {
    const ctx = chart.ctx;
    const meta = chart.getDatasetMeta(0);

    ctx.save();
    ctx.shadowColor = "rgba(0, 123, 255, 1)";
    ctx.shadowBlur = 30;

    ctx.beginPath();
    meta.data.forEach((point, index) => {
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });

    ctx.stroke();
    ctx.restore();
  },
};