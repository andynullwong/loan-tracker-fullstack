import { useUserContext } from "@/context/user.context";
import React, { useEffect, useState } from "react";

const applyDateLimit = (month: number | null) =>
  month === null || month < 0 ? 0 : month;

const fetchMonthlyLoanSummary = async (
  loanId: string,
  userId: number,
  month: number
) => await fetch(`/api/loans/${loanId}/month/${month}?user_id=${userId}`);

type LoanRangeTableProps = {
  loanId: string;
  fromDate: number | null;
  toDate: number | null;
};

const LoanRangeTable: React.FC<LoanRangeTableProps> = ({
  loanId,
  fromDate,
  toDate,
}) => {
  const [summary, setSummary] = useState([]);
  const { user, setUser } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rangeLength = toDate
          ? applyDateLimit(toDate) - applyDateLimit(fromDate)
          : applyDateLimit(fromDate);

        const promises = Array.from({ length: rangeLength }, (_, i) =>
          fetchMonthlyLoanSummary(loanId, user, i + 1)
        );

        const results = await Promise.all(promises);
        await Promise.all(results.map((result) => result.json())).then((data) =>
          setSummary(data as any)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [fromDate, loanId, toDate, user]);

  return <div>{JSON.stringify(summary)}</div>;
};

export default LoanRangeTable;
