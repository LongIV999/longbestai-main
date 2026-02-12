import { getAllJobs, getAllJobFilenames } from '@/lib/content/jobs';
import { JobCard } from '@/components/content/job-card';

export const metadata = {
  title: 'Jobs - LongBestAI',
  description: 'Cơ hội nghề nghiệp tại LongBestAI'
};

export default async function JobsPage() {
  const jobs = getAllJobs();
  const filenames = getAllJobFilenames();

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Jobs</h1>
      <p className="text-muted-foreground mb-12 text-lg">
        Tham gia đội ngũ của chúng tôi
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job, idx) => (
          <JobCard key={filenames[idx]} job={job} filename={filenames[idx]} />
        ))}
      </div>

      {jobs.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          Hiện tại chưa có vị trí tuyển dụng.
        </p>
      )}
    </div>
  );
}
