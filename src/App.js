import React, { useState, useCallback } from 'react';
import Container from './components/Container';
import Section from './components/Section';
import FeedbackOptions from './components/FeedbackOptions';
import Statistics from './components/Statistics';
import Notification from './components/Notification';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const totalSum = good + neutral + bad;
  const positivePercentageFeedback = Math.round((good / totalSum) * 100);

  const handlerBtnClick = useCallback(e => {
    const { name } = e.target;

    switch (name) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;

      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;

      case 'bad':
        setBad(prevState => prevState + 1);
        break;

      default:
        break;
    }
  }, []);

  return (
    <Container>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={{ good, neutral, bad }}
          onLeaveFeedback={handlerBtnClick}
        ></FeedbackOptions>
      </Section>
      <Section title="Statistics">
        {totalSum ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalSum}
            positivePercentage={positivePercentageFeedback}
          />
        ) : (
          <Notification message="No feedback given" />
        )}
      </Section>
    </Container>
  );
}
