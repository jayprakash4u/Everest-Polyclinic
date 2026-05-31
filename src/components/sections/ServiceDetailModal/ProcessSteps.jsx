function ProcessSteps({ steps }) {
  if (!steps || !steps.length) return null;
  return (
    <div className="ps-wrap">
      <div className="ps-steps">
        {steps.map((step, idx) => (
          <div key={idx} className="ps-step-item">
            <div className="ps-circle-wrap">
              <div className="ps-circle">
                <span className="ps-num">{step.num}</span>
              </div>
            </div>
            <div className="ps-label">{step.label}</div>
            {idx < steps.length - 1 && <div className="ps-connector"></div>}
          </div>
        ))}
      </div>
      <style jsx>{`
        .ps-wrap {
          padding: 20px 10px;
        }
        .ps-steps {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 0;
          flex-wrap: wrap;
        }
        .ps-step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 80px;
        }
        .ps-circle-wrap {
          margin-bottom: 8px;
        }
        .ps-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(145deg, #f0fdfa, #ccfbf1);
          border: 2px solid rgba(13, 148, 136, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ps-num {
          font-family: "Rajdhani", sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #0d9488;
        }
        .ps-label {
          font-family: "Rajdhani", sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: #334155;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-align: center;
        }
        .ps-connector {
          width: 20px;
          height: 2px;
          background: rgba(13, 148, 136, 0.3);
          margin-top: 24px;
        }
        @media (max-width: 640px) {
          .ps-steps {
            gap: 10px;
          }
          .ps-step-item {
            min-width: 60px;
          }
          .ps-circle {
            width: 40px;
            height: 40px;
          }
          .ps-num {
            font-size: 12px;
          }
          .ps-label {
            font-size: 9px;
          }
          .ps-connector {
            width: 10px;
            margin-top: 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default ProcessSteps;