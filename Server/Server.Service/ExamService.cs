using Server.Core.IServices;
using Server.Core.IRepository;
using Server.Core.Entities;
using AutoMapper;
using Server.Core.Dtos;

namespace Server.Service
{
    public class ExamService : IExamService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public ExamService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<List<ExamDto>> GetAllExamsAsync()
        {

            var exams = await _repositoryManager.Exams.GetAllAsync();
            return _mapper.Map<IEnumerable<ExamDto>>(exams).ToList();
        }

        public async Task<ExamDto> GetByIdAsync(int id)
        {
            Exam exam = await _repositoryManager.Exams.GetByIdAsync(id);
            ExamDto examDto = _mapper.Map<ExamDto>(exam);
            return examDto;
        }

        public async Task<ExamDto> AddExamAsync(ExamDto examDto)
        {
            Exam exam = _mapper.Map<Exam>(examDto);
            exam = await _repositoryManager.Exams.AddAsync(exam);
            await _repositoryManager.SaveAsync();
            examDto = _mapper.Map<ExamDto>(exam);
            return examDto;
        }

        public async Task DeleteExamAsync(ExamDto examDto)
        {
            Exam exam = _mapper.Map<Exam>(examDto);
            await _repositoryManager.Exams.DeleteAsync(exam);
            await _repositoryManager.SaveAsync();
        }

        public async Task<ExamDto> UpdateExamAsync(int id, ExamDto examDto)
        {
            Exam exam = _mapper.Map<Exam>(examDto);
            exam = await _repositoryManager.Exams.UpdateAsync(id, exam);
            await _repositoryManager.SaveAsync();
            examDto = _mapper.Map<ExamDto>(exam);
            return examDto;
        }
    }
}
