import { useState, useEffect } from "react";

const PAGE_SIZE = 6;
export default function App() {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [jobIds, setJobIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchJobIds = async () => {
    const res = await fetch(
      "https://hacker-news.firebaseio.com/v0/jobstories.json"
    );
    const data = await res.json();
    setJobIds(data);
  };

  useEffect(() => {
    fetchJobIds();
  }, []);

  const fetchJobs = async () => {
    const start = currentPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const ids = jobIds.slice(start, end);
    setLoading(true);
    try {
      const fetched = await Promise.all(
        ids.map((id) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
            (res) => res.json()
          )
        )
      );
      setJobs((prev) => [...prev, ...fetched]);
    } catch (err) {
      console.error(err);
      alert("Error occurred,Try again!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!jobIds.length) return;
    fetchJobs();
  }, [jobIds, currentPage]);

  const loadMoreJobs = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="jobs-board">
      <h1 className="title">Hacker News Jobs Board</h1>
      {jobIds.length === 0 ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="jobs" role="list">
          {jobs?.length > 0 &&
            jobs.map((job) => (
              <div className="post" id={job.id} key={job.id} role="listitem">
                <h2 className="post-title">{job.title}</h2>
                <p className="post-metadata">
                  By {job.by} . {new Date(job.time * 1000).toLocaleString()}
                </p>
              </div>
            ))}
        </div>
      )}

      {jobs.length > 0 &&
        currentPage * PAGE_SIZE + PAGE_SIZE < jobIds.length && (
          <button
            className="load-more-button"
            onClick={loadMoreJobs}
            disabled={loading}
          >
            {loading ? "Loading" : "Load more jobs"}
          </button>
        )}
    </div>
  );
}
