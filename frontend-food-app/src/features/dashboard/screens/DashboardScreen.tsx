import ReactEcharts from 'echarts-for-react';
const options = {
  grid: { top: 8, right: 8, bottom: 24, left: 36 },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true
    }
  ],
  tooltip: {
    trigger: 'axis'
  }
};
const DashboardScreen = () => {
  return (
    <section className="bg-dark min-h-[100vh] text-white pt-8 px-14">
      <ReactEcharts
        style={{
          width: '500px'
        }}
        option={options}
      />
    </section>
  );
};

export default DashboardScreen;
