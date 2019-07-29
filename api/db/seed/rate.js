const Rate = require('../../models/rate');

const createRates = async () => {
    const rate1 = new Rate({
        name: 'Top 1%',
    });

    const rate2 = new Rate({
      name: 'Top 5%',
    });

    const rate3 = new Rate({
      name: 'Top 10%',
    });

    const rate4 = new Rate({
      name: 'Top 25%',
    });

    const rate5 = new Rate({
      name: 'Top 50%',
    });

    const rate6 = new Rate({
      name: 'Bottom 50%',
    });

  
    await rate1.save();
    await rate2.save();
    await rate3.save();
    await rate4.save();
    await rate5.save();
    await rate6.save();
};

module.exports = createRates