
import React, { useEffect, useMemo, useState } from "react";

const API_URL = "https://remotive.com/api/remote-jobs";

const JobListings = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("latest");

    const [visibleCount, setVisibleCount] = useState(12);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(`${API_URL}?limit=100`);

            if (!response.ok) {
                throw new Error("Failed to fetch jobs");
            }

            const data = await response.json();

            setJobs(data.jobs || []);
        } catch (err) {
            console.error(err);
            setError("Unable to load jobs. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const categories = useMemo(() => {
        const uniqueCategories = [
            ...new Set(
                jobs
                    .map((job) => job.category)
                    .filter(Boolean)
            ),
        ];

        return uniqueCategories.sort();
    }, [jobs]);

    const filteredJobs = useMemo(() => {
        let result = [...jobs];

        // Search
        if (search.trim()) {
            const query = search.toLowerCase();

            result = result.filter((job) => {
                return (
                    job.title?.toLowerCase().includes(query) ||
                    job.company_name?.toLowerCase().includes(query) ||
                    job.category?.toLowerCase().includes(query) ||
                    job.tags?.some((tag) =>
                        tag.toLowerCase().includes(query)
                    )
                );
            });
        }

        // Category
        if (category !== "all") {
            result = result.filter(
                (job) => job.category === category
            );
        }

        // Sort
        result.sort((a, b) => {
            const dateA = new Date(a.publication_date);
            const dateB = new Date(b.publication_date);

            if (sort === "latest") {
                return dateB - dateA;
            }

            return dateA - dateB;
        });

        return result;
    }, [jobs, search, category, sort]);

    const visibleJobs = filteredJobs.slice(0, visibleCount);

    const formatDate = (date) => {
        if (!date) return "";

        const published = new Date(date);
        const now = new Date();

        const diff = now - published;

        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 60) {
            return `${Math.max(minutes, 1)} min ago`;
        }

        if (hours < 24) {
            return `${hours} hr${hours > 1 ? "s" : ""} ago`;
        }

        if (days < 7) {
            return `${days} day${days > 1 ? "s" : ""} ago`;
        }

        return published.toLocaleDateString();
    };

    return (
        <section className="bg-gray-50 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-10 text-center">
                    <span className="mb-3 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
                        Latest Opportunities
                    </span>

                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Find Your Next Job
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-gray-600">
                        Browse the latest job opportunities from companies
                        hiring now.
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-8 rounded-2xl bg-white p-4 shadow-sm">
                    <div className="grid gap-4 md:grid-cols-3">

                        {/* Search */}
                        <div className="relative">
                            <svg
                                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                                />
                            </svg>

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setVisibleCount(12);
                                }}
                                placeholder="Search jobs, companies, skills..."
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:bg-white"
                            />
                        </div>

                        {/* Category */}
                        <select
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setVisibleCount(12);
                            }}
                            className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                        >
                            <option value="all">
                                All Categories
                            </option>

                            {categories.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>

                        {/* Sort */}
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                        >
                            <option value="latest">
                                Latest Jobs
                            </option>

                            <option value="oldest">
                                Oldest Jobs
                            </option>
                        </select>
                    </div>
                </div>

                {/* Results */}
                <div className="mb-5 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        Showing{" "}
                        <strong className="text-gray-900">
                            {visibleJobs.length}
                        </strong>{" "}
                        of{" "}
                        <strong className="text-gray-900">
                            {filteredJobs.length}
                        </strong>{" "}
                        jobs
                    </p>

                    <button
                        onClick={fetchJobs}
                        disabled={loading}
                        className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
                    >
                        {loading ? "Refreshing..." : "Refresh"}
                    </button>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {[...Array(6)].map((_, index) => (
                            <div
                                key={index}
                                className="animate-pulse rounded-2xl bg-white p-6 shadow-sm"
                            >
                                <div className="mb-5 h-12 w-12 rounded-xl bg-gray-200" />

                                <div className="mb-3 h-5 w-3/4 rounded bg-gray-200" />

                                <div className="mb-5 h-4 w-1/2 rounded bg-gray-200" />

                                <div className="mb-2 h-3 w-full rounded bg-gray-200" />
                                <div className="h-3 w-4/5 rounded bg-gray-200" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="rounded-2xl bg-red-50 p-8 text-center">
                        <p className="mb-4 text-red-600">
                            {error}
                        </p>

                        <button
                            onClick={fetchJobs}
                            className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Jobs */}
                {!loading && !error && (
                    <>
                        {visibleJobs.length === 0 ? (
                            <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
                                <div className="mb-4 text-5xl">
                                    🔍
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900">
                                    No jobs found
                                </h3>

                                <p className="mt-2 text-gray-500">
                                    Try changing your search or filters.
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                                {visibleJobs.map((job) => (
                                    <article
                                        key={job.id}
                                        className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    >
                                        {/* Company */}
                                        <div className="mb-5 flex items-start justify-between">
                                            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
                                                {job.company_logo ? (
                                                    <img
                                                        src={job.company_logo}
                                                        alt={job.company_name}
                                                        className="h-full w-full object-contain"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <span className="text-lg font-bold text-gray-400">
                                                        {job.company_name
                                                            ?.charAt(0)
                                                            ?.toUpperCase()}
                                                    </span>
                                                )}
                                            </div>

                                            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                                                New
                                            </span>
                                        </div>

                                        {/* Job title */}
                                        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 transition group-hover:text-blue-600">
                                            {job.title}
                                        </h3>

                                        {/* Company */}
                                        <p className="mb-4 font-medium text-gray-600">
                                            {job.company_name}
                                        </p>

                                        {/* Job information */}
                                        <div className="mb-5 space-y-2 text-sm text-gray-500">

                                            <div className="flex items-center gap-2">
                                                <span>📍</span>
                                                <span>
                                                    {job.candidate_required_location ||
                                                        "Remote"}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <span>💼</span>
                                                <span>
                                                    {job.job_type ||
                                                        "Full-time"}
                                                </span>
                                            </div>

                                            {job.salary && (
                                                <div className="flex items-center gap-2">
                                                    <span>💰</span>
                                                    <span>
                                                        {job.salary}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="flex items-center gap-2">
                                                <span>🕒</span>
                                                <span>
                                                    {formatDate(
                                                        job.publication_date
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        {job.tags?.length > 0 && (
                                            <div className="mb-5 flex flex-wrap gap-2">
                                                {job.tags
                                                    .slice(0, 4)
                                                    .map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                            </div>
                                        )}

                                        {/* Spacer */}
                                        <div className="mt-auto pt-4">
                                            <a
                                                href={job.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex w-full items-center justify-center rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                                            >
                                                View Job
                                                <span className="ml-2 transition group-hover:translate-x-1">
                                                    →
                                                </span>
                                            </a>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}

                        {/* Load More */}
                        {visibleCount < filteredJobs.length && (
                            <div className="mt-10 text-center">
                                <button
                                    onClick={() =>
                                        setVisibleCount(
                                            (prev) => prev + 12
                                        )
                                    }
                                    className="rounded-xl border border-gray-300 bg-white px-8 py-3 font-semibold text-gray-800 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                                >
                                    Load More Jobs
                                </button>
                            </div>
                        )}
                    </>
                )}

                {/* Source */}
                <p className="mt-10 text-center text-xs text-gray-400">
                    Job listings are provided by Remotive. Please verify
                    availability and application details on the original
                    job posting.
                </p>
            </div>
        </section>
    );
};

export default JobListings;

